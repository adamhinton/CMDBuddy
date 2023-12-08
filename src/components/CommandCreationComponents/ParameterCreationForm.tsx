// README:
// User fills this form out to make a Parameter
// Param can be STRING, INT, BOOLEAN, DROPDOWN or FLAG
// Different fields in form for each type
// User can add as many Parameters as they want; they fill out this form once per Parameter
// FLAG Is stuff like `--headed` or `--all` which you either include in the command or don't.
// BOOLEAN is a true/false variable, like `isLookingForJob=true`

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
	CommandCreationUtils,
	DefaultValueInput,
	FlagParameterErrors,
} from "../../../utils/CommandCreationUtils";
import {
	AnyParameter,
	StringParameterErrors,
	IntParameterErrors,
	DropdownParameterErrors,
} from "../../../utils/CommandCreationUtils";

type FormProps = {
	index: number;
	removeParameter: Function;
};

const {
	StringParameterFields,
	IntParameterFields,
	BooleanParameterFields,
	DropdownParameterFields,
	FlagParameterFields,
} = CommandCreationUtils;

export type ParameterCreationType =
	| "STRING"
	| "INT"
	| "BOOLEAN"
	| "DROPDOWN"
	| "FLAG";

// User fills this out once for every Parameter they create
const ParameterCreationForm = ({ index, removeParameter }: FormProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<{ parameters: AnyParameter[] }>();

	const [parameterType, setParameterType] =
		useState<ParameterCreationType>("STRING");
	const parameterErrors = errors.parameters?.[index];

	// This updates the necessary fields when user clicks a different parameter type
	// Name here refers to the name of the field, not the `name` key in Parameters
	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (type === "change" && name?.includes(`parameters.${index}.type`)) {
				const parameter = value.parameters ? value.parameters[index] : null;
				if (parameter) {
					setParameterType(parameter.type!);
				}
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, index]);

	// User fills out different fields based on if the Parameter is a STRING, INT, BOOLEAN, or DROPDOWN
	const renderParameterSpecificFields = () => {
		switch (parameterType) {
			case "STRING":
				return (
					<StringParameterFields
						index={index}
						parameterErrors={parameterErrors as StringParameterErrors}
					/>
				);
			case "INT":
				return (
					<IntParameterFields
						index={index}
						parameterErrors={parameterErrors as IntParameterErrors}
					/>
				);
			case "BOOLEAN":
				return <BooleanParameterFields index={index} />;
			case "DROPDOWN":
				return (
					<DropdownParameterFields
						index={index}
						parameterErrors={parameterErrors as DropdownParameterErrors}
					/>
				);
			case "FLAG":
				return (
					<FlagParameterFields
						index={index}
						parameterErrors={parameterErrors as FlagParameterErrors}
					/>
				);
			default:
				return null;
		}
	};

	// Every Parameter has these fields, regardless of type
	return (
		<div>
			{/* Parameter Type Selector */}
			<label>Type</label>
			<select
				{...register(`parameters.${index}.type`)}
				onChange={(e) =>
					setParameterType(e.target.value as ParameterCreationType)
				}
			>
				<option value="STRING">String</option>
				<option value="INT">Integer</option>
				<option value="BOOLEAN">Boolean</option>
				<option value="DROPDOWN">Dropdown</option>
				<option value="FLAG">Flag</option>
			</select>

			{/* Shared Name Field */}
			<label>Name</label>
			<input
				{...register(`parameters.${index}.name`)}
				placeholder="Name"
				required={true}
				maxLength={30}
			/>
			{parameterErrors?.name && <p>{parameterErrors.name.message}</p>}

			<DefaultValueInput
				type={parameterType}
				register={register}
				index={index}
				parameterErrors={parameterErrors}
			></DefaultValueInput>

			{/* IsNullable (Optional) Checkbox */}
			{/* This isn't needed in FLAG type */}
			{parameterType !== "FLAG" && (
				<label>
					<input
						type="checkbox"
						{...register(`parameters.${index}.isNullable`)}
					/>
					Optional
				</label>
			)}

			{renderParameterSpecificFields()}

			{/* Delete Parameter Button */}
			<button type="button" onClick={() => removeParameter(index)}>
				Delete Parameter
			</button>
		</div>
	);
};

export default ParameterCreationForm;