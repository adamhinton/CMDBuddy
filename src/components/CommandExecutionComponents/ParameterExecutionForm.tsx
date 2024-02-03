"use client";

// README:
// This is a sub-component of CommandExecutionForm
// Here, the user enters a value for an individual Parameter. This is part of the generated Command that is displayed in LiveCommandExecutionPreview

// IMPORTANT NOTE about errors: The user has control of this process. The app validates their Parameter value inputs and alerts them if there's an error (e.g. the input is longer than their specified maxLength), but it doesn't stop the user from generating/copying the command. It's only a guideline.

import React from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";
import CEFStyles from "../../../utils/CommandExecutionUtils/CommandExecutionStyles";
const {
	CEFInput,
	CEFLabel,
	CEFOption,
	CEFSelect,
	FlagOrBooleanPEFLabel,
	PEFContainer,
} = CEFStyles;
import { CEFDefaultValues } from "./CommandExecutionForm";
import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
const ParameterExecutionForm = ({
	parameter,
	methods,
}: {
	parameter: Readonly<CMDBuddyParameter>;
	methods: UseFormReturn<CEFDefaultValues, any, undefined>;
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const hasError = errors[parameter.name] ? true : false;

	// Render input based on parameter type
	const renderInputField = () => {
		switch (parameter.type) {
			case "STRING":
				return (
					<CEFInput
						inputtype="STRING"
						type="text"
						{...register(parameter.name, {
							required: parameter.isNullable
								? undefined
								: "This field is required.",
							maxLength: {
								value: parameter.maxLength || Infinity,
								message: `Maximum length is ${parameter.maxLength} characters.`,
							},
							minLength: {
								value: parameter.minLength || 0,
								message: `Minimum length is ${parameter.minLength} characters.`,
							},
							pattern: parameter.validationRegex
								? {
										value: new RegExp(parameter.validationRegex),
										message: `This field does not match the required pattern: ${parameter.validationRegex}`,
								  }
								: undefined,
							onBlur: (e) => {
								// Trigger the validation for this field on blur
								methods.trigger(parameter.name);
							},
							// If there's an error, this runs validation every time the input changes
							onChange: (e) => {
								hasError && methods.trigger(parameter.name);
							},
						})}
					/>
				);

			case "INT":
				return (
					<CEFInput
						inputtype="INT"
						type="number"
						{...register(parameter.name, {
							required: parameter.isNullable
								? undefined
								: "This field is required.",
							max: {
								value: parameter.maxValue
									? Number(parameter.maxValue)
									: Infinity,
								message: `The value cannot be greater than ${parameter.maxValue}.`,
							},
							min: {
								value: parameter.minValue
									? Number(parameter.minValue)
									: -Infinity,
								message: `The value cannot be less than ${parameter.minValue}.`,
							},
							onBlur: (e) => {
								// Trigger validation when the user clicks/tabs away from the input
								methods.trigger(parameter.name);
							},
							// If there's an error, this runs validation every time the input changes
							onChange: (e) => {
								hasError && methods.trigger(parameter.name);
							},
						})}
					/>
				);

			case "BOOLEAN":
				return (
					<FlagOrBooleanPEFLabel>
						<CEFLabel>
							<CEFInput
								type="radio"
								value="true"
								{...register(parameter.name, {
									// This validation shouldn't ever actually be triggered
									required: "Please select an option.",
									onBlur: (e) => {
										methods.trigger(parameter.name);
									},
								})}
								inputtype="OTHER"
							/>
							True
						</CEFLabel>
						<CEFLabel>
							<CEFInput
								type="radio"
								value="false"
								{...register(parameter.name, {
									// This validation shouldn't ever actually be triggered
									required: "Please select an option.",
									onBlur: (e) => {
										methods.trigger(parameter.name);
									},
									// If there's an error, this runs validation every time the input changes
									onChange: (e) => {
										hasError && methods.trigger(parameter.name);
									},
								})}
								inputtype="OTHER"
							/>
							False
						</CEFLabel>
					</FlagOrBooleanPEFLabel>
				);

			case "DROPDOWN":
				return (
					<CEFSelect
						{...register(parameter.name, {
							required: parameter.isNullable
								? undefined
								: "This field is required.",
							onBlur: (e) => {
								// Trigger validation when the user clicks/tabs away from the dropdown
								methods.trigger(parameter.name);
							},
							// If there's an error, this runs validation every time the input changes
							onChange: (e) => {
								hasError && methods.trigger(parameter.name);
							},
						})}
					>
						{parameter.allowedValues?.map((value) => (
							<CEFOption key={value} value={value}>
								{value}
							</CEFOption>
						))}
					</CEFSelect>
				);

			case "FLAG":
				return (
					<FlagOrBooleanPEFLabel>
						<CEFLabel>
							<CEFInput
								type="radio"
								value="On"
								{...register(parameter.name, {
									required: !parameter.isNullable,
									// Trigger validation when user clicks/tabs away
									onBlur: (e) => {
										methods.trigger(parameter.name);
									},
									// If there's an error, this runs validation every time the input changes
									onChange: (e) => {
										hasError && methods.trigger(parameter.name);
									},
								})}
								inputtype="OTHER"
							/>
							On
						</CEFLabel>
						<CEFLabel>
							<CEFInput
								type="radio"
								value="Off"
								{...register(parameter.name, {
									required: !parameter.isNullable,
									// Trigger validation when user clicks/tabs away
									onBlur: (e) => {
										methods.trigger(parameter.name);
									},
									// If there's an error, this runs validation every time the input changes
									onChange: (e) => {
										hasError && methods.trigger(parameter.name);
									},
								})}
								inputtype="OTHER"
							/>
							Off
						</CEFLabel>
					</FlagOrBooleanPEFLabel>
				);
			default:
				return <p>Unsupported parameter type</p>;
		}
	};

	return (
		// Has red background and more stand-out styling if there's a validation error
		<PEFContainer haserror={hasError || undefined}>
			<CEFLabel htmlFor={parameter.name}>
				{/* Asterisk  next to param's name if param is required */}
				{parameter.name} {!parameter.isNullable && "*"}
			</CEFLabel>
			{renderInputField()}
		</PEFContainer>
	);
};

export default ParameterExecutionForm;

/**Generate reminder text of the parameter's attributes
 *
 * For instance, max length, min length etc (only if that attribute isn't null)
 *
 * Returns an array of attribute strings which will be looped over to form a tooltip.
 *
 * This is really only needed for int and string
 */
const generateParameterToolTip = (parameter: AnyParameter): string[] | [] => {
	const addTextToToolTip = (text: string) => {
		toolTipText.push(text);
	};

	let toolTipText: string[] = [];

	parameter.defaultValue &&
		addTextToToolTip(`Default value: ${parameter.defaultValue}`);

	switch (parameter.type) {
		case "INT": {
			parameter.minValue &&
				addTextToToolTip(`Min value: ${parameter.minValue}`);
			parameter.maxValue &&
				addTextToToolTip(`Max value: ${parameter.maxValue}`);
			return toolTipText;
		}

		case "STRING": {
			parameter.minLength &&
				addTextToToolTip(`Min length: ${parameter.minLength}`);
			parameter.maxLength &&
				toolTipText.push(`Max length: ${parameter.maxLength}`);
			parameter.validationRegex &&
				addTextToToolTip(`Regex: ${parameter.validationRegex}`);
			return toolTipText;
		}

		// This is really only needed for int and string; I included the other fields below for clarity

		case "BOOLEAN": {
			// No additional fields here
		}

		case "DROPDOWN": {
			// No additional fields here
		}

		case "FLAG": {
			// No additional fields here
		}
	}

	return toolTipText;
};
