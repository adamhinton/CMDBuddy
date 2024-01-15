"use client";

// README:
// This is a sub-component of CommandExecutionForm
// Here, the user enters a value for an individual Parameter. This is part of the generated Command that is displayed in LiveCommandExecutionPreview

// IMPORTANT NOTE about errors: The user has control of this process. The app validates their Parameter value inputs and alerts them if there's an error (e.g. the input is longer than their specified maxLength), but it doesn't stop the user from generating/copying the command. It's only a guideline.

// TODO: PEFValidationUtils file or something, split this file up

import React from "react";
import { DefaultValues, UseFormReturn, useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";
import {
	CEFDefaultValues,
	CEFInput,
	CEFLabel,
	CEFOption,
	CEFSelect,
} from "./CommandExecutionForm";
import styled from "styled-components";
const ParameterExecutionForm = ({
	parameter,
	methods,
}: {
	parameter: CMDBuddyParameter;
	methods: UseFormReturn<CEFDefaultValues, any, undefined>;
}) => {
	const {
		register,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext();

	const hasError = errors[parameter.name] ? true : false;

	// Validate parameter when user clicks/tabs/etc away from its input
	// TODO: Make this toast or something
	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement>,
		parameter: CMDBuddyParameter
	) => {
		console.log("handling blur");
		const error = validateParameter(e.target.value, parameter);
		if (error) {
			setError(parameter.name, { type: "manual", message: error });
		} else {
			clearErrors(parameter.name);
		}
	};

	// Dummy param validation fxn
	// TODO: Flesh this out and move it somewhere better
	// TODO: If error exists, validate on every change without waiting for blur so user knows when it's fixed. Something like this pseudocode:  `onChange: hasError && validate...`
	const validateParameter = (
		value: string,
		parameter: CMDBuddyParameter
	): string | undefined => {
		if (parameter.type === "STRING" && value.length > 10) {
			console.log("parameter validation failed because length > 10. Yay!");
			return "String too long"; // Return error message
		}
		// No error
		return undefined;
	};

	// Render input based on parameter type
	const renderInputField = () => {
		switch (parameter.type) {
			case "STRING":
				return (
					<CEFInput
						inputtype="STRING"
						type="text"
						{...register(parameter.name, {
							required: !parameter.isNullable,
							maxLength: parameter.maxLength,
							minLength: parameter.minLength,
							pattern: parameter.validationRegex
								? new RegExp(parameter.validationRegex)
								: undefined,
							// Onblur is when the user clicks/tabs/etc away from the input
							onBlur: (e) => {
								// Built in form validation
								methods.trigger(parameter.name);
								// Additional custom validation
								handleBlur(e, parameter);
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
							required: !parameter.isNullable,
							max: parameter.maxValue,
							min: parameter.minValue,
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
									required: !parameter.isNullable,
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
									required: !parameter.isNullable,
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
							required: !parameter.isNullable,
							value: parameter.defaultValue,
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
		<PEFContainer haserror={hasError}>
			<CEFLabel htmlFor={parameter.name}>{parameter.name}</CEFLabel>
			{renderInputField()}
		</PEFContainer>
	);
};

// Pass in optional error
// If there's an error we do additional styling to make that clear
// React is making me spell haserror all lower case for some reason
const PEFContainer = styled.div<{ haserror?: boolean }>`
	display: flex;
	flex-direction: row;
	max-width: 400px;
	background: ${({ theme, haserror }) =>
		haserror
			? "rgba(255, 0, 0, 0.1)"
			: theme.commandGeneration.inputBackground};
	padding: 0.2rem;
	border-radius: 4px;
	margin-bottom: 0.75rem;
	border: ${({ theme, haserror }) =>
		haserror ? "2px solid red" : `1px solid ${theme.colors.text}`};
	transition: box-shadow 0.3s ease, border 0.3s ease, background-color 0.3s ease;

	&:hover {
		box-shadow: ${({ haserror }) =>
			haserror ? "0 0 10px red" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
	}
`;
const FlagOrBooleanPEFLabel = styled.div`
	display: flex;
	align-items: center;
	margin-right: 1rem;
`;

export default ParameterExecutionForm;
