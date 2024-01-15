"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";
import {
	CEFInput,
	CEFLabel,
	CEFOption,
	CEFSelect,
} from "./CommandExecutionForm";
import styled from "styled-components";

const ParameterExecutionForm = ({
	parameter,
}: {
	parameter: CMDBuddyParameter;
}) => {
	const {
		register,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext();

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
							onBlur: (e) => handleBlur(e, parameter),
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
		<PEFContainer>
			<CEFLabel htmlFor={parameter.name}>{parameter.name}</CEFLabel>
			{renderInputField()}
		</PEFContainer>
	);
};

const PEFContainer = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 400px;
	background: ${({ theme }) => theme.commandGeneration.inputBackground};
	padding: 0.2rem;
	border-radius: 4px;
	margin-bottom: 0.75rem;
	border: 1px solid ${({ theme }) => theme.colors.text};
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Soft shadow on hover for interactivity
	}
`;

const FlagOrBooleanPEFLabel = styled.div`
	display: flex;
	align-items: center;
	margin-right: 1rem;
`;

export default ParameterExecutionForm;
