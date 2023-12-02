import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ParameterSchema } from "../../utils/zod/ParameterSchema";
import z from "zod";

// THIS IS WHAT I IMPORTED FROM PARAMETERSCHEMA, copying it here, commented out, for quick reference.
// export const ParameterSchema = z.object({
// 	id: z.string().uuid(),
// 	type: z.enum(["STRING", "INT", "BOOLEAN", "DROPDOWN"]),
// 	defaultValue: z.string().optional(),
// 	name: z.string(),
// 	order: z.number().int(),
// 	validationRegex: z.string().optional(),
// 	minLength: z.number().int().optional(),
// 	maxLength: z.number().int().optional(),
// 	minValue: z.number().int().optional(),
// 	maxValue: z.number().int().optional(),
// 	isNullable: z.boolean(),
// 	allowedValues: z.array(z.string()).optional(),
// 	commandID: z.string().uuid(),
// });

// export type CMDBuddyParameter = z.infer<typeof ParameterSchema>;

// Subtypes for each parameter type
export const StringParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	validationRegex: true,
	minLength: true,
	maxLength: true,
	isNullable: true,
}).extend({
	type: z.literal("STRING"),
});

export const IntParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	minValue: true,
	maxValue: true,
	isNullable: true,
}).extend({
	type: z.literal("INT"),
});

export const BooleanParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	isNullable: true,
}).extend({
	type: z.literal("BOOLEAN"),
});

export const DropdownParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	allowedValues: true,
	isNullable: true,
}).extend({
	type: z.literal("DROPDOWN"),
});

export type StringParameter = z.infer<typeof StringParameterSchema>;
export type IntParameter = z.infer<typeof IntParameterSchema>;
export type BooleanParameter = z.infer<typeof BooleanParameterSchema>;
export type DropdownParameter = z.infer<typeof DropdownParameterSchema>;

export type AnyParameter =
	| StringParameter
	| IntParameter
	| BooleanParameter
	| DropdownParameter;

type FormProps = {
	index: number;
	removeParameter: Function;
};

// Helper function to convert empty string to null
const toNumberOrNullOrUndefined = (value: string) =>
	value === "" ? undefined : Number(value);

const ParameterCreationForm = ({ index, removeParameter }: FormProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<{ parameters: AnyParameter[] }>();

	const [parameterType, setParameterType] = useState("STRING");

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

	const renderParameterSpecificFields = () => {
		console.log("parameterType:", parameterType);
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
			default:
				return null;
		}
	};

	return (
		<div>
			{/* Parameter Type Selector */}
			<label>Type</label>
			<select
				{...register(`parameters.${index}.type`)}
				onChange={(e) => setParameterType(e.target.value)}
			>
				<option value="STRING">String</option>
				<option value="INT">Int</option>
				<option value="BOOLEAN">Boolean</option>
				<option value="DROPDOWN">Dropdown</option>
			</select>

			{/* Shared Name Field */}
			<label>Name</label>
			<input
				{...register(`parameters.${index}.name`)}
				placeholder="Name"
				required={true}
			/>
			{parameterErrors?.name && <p>{parameterErrors.name.message}</p>}

			{/* Default Value Field */}
			<label>Default Value</label>
			<input
				type="string"
				{...register(`parameters.${index}.defaultValue`)}
				placeholder="Default Value"
			/>
			{parameterErrors?.defaultValue && (
				<p>{parameterErrors.defaultValue.message}</p>
			)}

			{/* IsNullable (Optional) Checkbox */}
			<label>
				<input
					type="checkbox"
					{...register(`parameters.${index}.isNullable`)}
				/>
				Optional
			</label>

			{renderParameterSpecificFields()}

			{/* Delete Parameter Button */}
			<button type="button" onClick={() => removeParameter(index)}>
				Delete Parameter
			</button>
		</div>
	);
};

type StringParameterErrors = {
	minLength?: {
		message: string;
	};
	defaultValue?: {
		message: string;
	};
	maxLength?: {
		message: string;
	};
	validationRegex?: {
		message: string;
	};
};

const StringParameterFields = ({
	index,
	parameterErrors,
}: {
	index: number;
	parameterErrors: StringParameterErrors;
}) => {
	const { register } = useFormContext<{ parameters: AnyParameter[] }>();

	return (
		<>
			{/* Min Length Field */}
			<label>Min Length</label>
			<input
				type="number"
				{...register(`parameters.${index}.minLength`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Min Length"
			/>
			{parameterErrors?.minLength && <p>{parameterErrors.minLength.message}</p>}

			{/* Max Length Field */}
			<label>Max Length</label>
			<input
				type="number"
				{...register(`parameters.${index}.maxLength`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Max Length"
			/>
			{parameterErrors?.maxLength && <p>{parameterErrors.maxLength.message}</p>}

			{/* Validation Regex Field */}
			<label>Validation Regex</label>
			<input
				{...register(`parameters.${index}.validationRegex`)}
				placeholder="Validation Regex"
			/>
			{parameterErrors?.validationRegex && (
				<p>{parameterErrors.validationRegex.message}</p>
			)}
		</>
	);
};

type IntParameterErrors = {
	defaultValue?: {
		message: string;
	};
	minValue?: {
		message: string;
	};
	maxValue?: {
		message: string;
	};
};

const IntParameterFields = ({
	index,
	parameterErrors,
}: {
	index: number;
	parameterErrors: IntParameterErrors;
}) => {
	const { register } = useFormContext<{ parameters: AnyParameter[] }>();

	return (
		<>
			{/* Min Value Field */}
			<label>Min Value</label>
			<input
				type="number"
				{...register(`parameters.${index}.minValue`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Min Value"
			/>
			{parameterErrors?.minValue && <p>{parameterErrors.minValue.message}</p>}

			{/* Max Value Field */}
			<label>Max Value</label>
			<input
				type="number"
				{...register(`parameters.${index}.maxValue`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Max Value"
			/>
			{parameterErrors?.maxValue && <p>{parameterErrors.maxValue.message}</p>}
		</>
	);
};

// Leaving this here for documentation, but we don't actually need any custom fields for Boolean right now.
const BooleanParameterFields = ({ index }: { index: number }) => {
	// Boolean specific fields (if any)
	return <></>;
};

type DropdownParameterErrors = {
	defaultValue?: {
		message: string;
	};
	allowedValues?: {
		message: string;
	};
};

const DropdownParameterFields = ({
	index,
	parameterErrors,
}: {
	index: number;
	parameterErrors: DropdownParameterErrors;
}) => {
	const { register } = useFormContext<{ parameters: AnyParameter[] }>();

	// Helper function to convert string to array
	const stringToArray = (value: string) => {
		return value.split(",").map((val) => val.trim());
	};

	return (
		<>
			{/* Default Value Field */}
			<label>Default Value</label>
			<input
				{...register(`parameters.${index}.defaultValue`)}
				placeholder="Default Value"
			/>
			{parameterErrors?.defaultValue && (
				<p>{parameterErrors.defaultValue.message}</p>
			)}

			{/* Allowed Values Field */}
			<label>Allowed Values</label>
			<textarea
				{...register(`parameters.${index}.allowedValues`, {
					setValueAs: stringToArray,
				})}
				placeholder="Enter values separated by commas"
				rows={4}
			/>
			{parameterErrors?.allowedValues && (
				<p>{parameterErrors.allowedValues.message}</p>
			)}
		</>
	);
};

export default ParameterCreationForm;
