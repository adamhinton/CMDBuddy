import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ParameterSchema } from "../../utils/zod/ParameterSchema";
import z from "zod";

// export const ParameterSchema = z.object({
// 	id: z.string().uuid(),
// 	type: z.enum(["STRING", "INT", "BOOLEAN", "DROPDOWN"]),
// 	defaultValue: z.string().optional(),
// 	name: z.string(),
// 	order: z.number().int(),
// 	validationRegex: z.string().optional(),
// 	length: z.number().int().optional(),
// 	minValue: z.number().int().optional(),
// 	maxValue: z.number().int().optional(),
// 	isNullable: z.boolean(),
// 	allowedValues: z.array(z.string()).optional(),
// 	commandID: z.string().uuid(),
// });

// Subtypes for each parameter type
export const StringParameterSchema = ParameterSchema.extend({
	type: z.literal("STRING"),
}).omit({
	id: true,
	order: true,
	commandID: true,
	minValue: true,
	maxValue: true,
	allowedValues: true,
});

export const IntParameterSchema = ParameterSchema.extend({
	type: z.literal("INT"),
}).omit({
	id: true,
	order: true,
	commandID: true,
	length: true,
	validationRegex: true,
	allowedValues: true,
});

export const BooleanParameterSchema = ParameterSchema.extend({
	type: z.literal("BOOLEAN"),
}).omit({
	id: true,
	order: true,
	commandID: true,
	length: true,
	minValue: true,
	maxValue: true,
	validationRegex: true,
	allowedValues: true,
});

export const DropdownParameterSchema = ParameterSchema.extend({
	type: z.literal("DROPDOWN"),
}).omit({
	id: true,
	order: true,
	commandID: true,
	length: true,
	minValue: true,
	maxValue: true,
	validationRegex: true,
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

const ParameterCreationForm = ({ index, removeParameter }: FormProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<{ parameters: AnyParameter[] }>();

	const [parameterType, setParameterType] = useState("STRING");

	const parameterErrors = errors.parameters?.[index];

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (type === "change" && name?.includes(`parameters.${index}.type`)) {
				setParameterType(value.parameters[index].type);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, index]);

	const renderParameterSpecificFields = () => {
		switch (parameterType) {
			case "STRING":
				return <StringParameterFields index={index} />;
			case "INT":
				return <IntParameterFields index={index} />;
			case "BOOLEAN":
				return <BooleanParameterFields index={index} />;
			case "DROPDOWN":
				return <DropdownParameterFields index={index} />;
			default:
				return null;
		}
	};

	return (
		<div>
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

			{/* Shared Name field */}
			<input {...register(`parameters.${index}.name`)} placeholder="Name" />

			{renderParameterSpecificFields()}

			<button type="button" onClick={() => removeParameter(index)}>
				Delete Parameter
			</button>
		</div>
	);
};

const StringParameterFields = ({ index }: { index: number }) => {
	// String specific fields (if any)
	return <></>;
};

const IntParameterFields = ({ index }: { index: number }) => {
	// Integer specific fields (if any)
	return <></>;
};

const BooleanParameterFields = ({ index }: { index: number }) => {
	// Boolean specific fields (if any)
	return <></>;
};

const DropdownParameterFields = ({ index }: { index: number }) => {
	// Dropdown specific fields (if any)
	return <></>;
};

export default ParameterCreationForm;
