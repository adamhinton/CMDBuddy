// README:
// This is the utils file for initial creation of user's Commands and each Command's Parameters to save to the db
// Most of this is for Parameters which are somewhat complex since there are four different types of Parameter, and different fields to complete for each.

import { z } from "zod";
import { ParameterSchema } from "./zod/ParameterSchema";
import { useFormContext } from "react-hook-form";
import { ParameterCreationType } from "@/components/ParameterCreationForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";

// Subtypes for each parameter type
const StringParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	validationRegex: true,
	minLength: true,
	maxLength: true,
	isNullable: true,
}).extend({
	type: z.literal("STRING"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
});

const IntParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	minValue: true,
	maxValue: true,
	isNullable: true,
}).extend({
	type: z.literal("INT"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
});

const BooleanParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	isNullable: true,
}).extend({
	type: z.literal("BOOLEAN"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	// Needs to be string for validation purposes, can convert later
	defaultValue: z.enum(["true", "false"]),
});

const DropdownParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
	allowedValues: true,
	isNullable: true,
}).extend({
	type: z.literal("DROPDOWN"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
});

const FlagParameterSchema = ParameterSchema.pick({
	type: true,
	defaultValue: true,
	name: true,
}).extend({
	type: z.literal("FLAG"),
	// Making Order optional because we only add it on submit
	order: z.number().int().optional(),
	defaultValue: z.enum(["On", "Off"]),
});

// Helper function to convert empty string to null bc schema expects null for some inputs if they're empty
const toNumberOrNullOrUndefined = (value: string) =>
	value === "" ? undefined : Number(value);

type StringParameter = z.infer<typeof StringParameterSchema>;
type IntParameter = z.infer<typeof IntParameterSchema>;
type BooleanParameter = z.infer<typeof BooleanParameterSchema>;
type DropdownParameter = z.infer<typeof DropdownParameterSchema>;
type FlagParameter = z.infer<typeof FlagParameterSchema>;

type AnyParameter =
	| StringParameter
	| IntParameter
	| BooleanParameter
	| DropdownParameter
	| FlagParameter;

// Parameter Field Functions
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
				maxLength={100}
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

// Leaving this here for reference and organization, but we don't actually need any custom fields for Boolean right now.
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
		// Value might already be an array if it's been submitted before
		// Because submitting converted it to an array already
		return typeof value === "string"
			? value.split(",").map((val) => val.trim())
			: value;
	};

	return (
		<>
			{/* Allowed Values Field */}
			{/* Enter as many allowed values as they want, separated by commas */}
			<label>Allowed Values</label>
			<textarea
				{...register(`parameters.${index}.allowedValues`, {
					setValueAs: stringToArray,
				})}
				placeholder="Enter values separated by commas"
				rows={4}
				maxLength={5000}
			/>
			{parameterErrors?.allowedValues && (
				<p>{parameterErrors.allowedValues.message}</p>
			)}
		</>
	);
};

type FlagParameterErrors = {
	defaultValue?: {
		message: string;
	};
};

const FlagParameterFields = ({
	index,
	parameterErrors,
}: {
	index: number;
	parameterErrors: FlagParameterErrors;
}) => {
	// Nothing to put here right now but leaving this because I might have something soon
	return <></>;
};

// "Default Value" input fields will be a little different depending on Parameter type.
export const DefaultValueInput = ({
	type,
	register,
	index,
	parameterErrors,
}: {
	type: ParameterCreationType;
	register: UseFormRegister<any>;
	index: number;
	parameterErrors: any; // TODO: Specify the correct type here
}) => {
	switch (type) {
		case "STRING":
		case "DROPDOWN":
			return (
				<>
					<label>Default Value</label>
					<input
						type="text"
						{...register(`parameters.${index}.defaultValue`)}
						placeholder="Default Value"
						maxLength={1000}
					/>
					{parameterErrors?.defaultValue && (
						<p>{parameterErrors.defaultValue.message}</p>
					)}
				</>
			);

		case "INT":
			return (
				<>
					<label>Default Value</label>
					<input
						type="number"
						{...register(`parameters.${index}.defaultValue`)}
						placeholder="Number"
					/>
					{parameterErrors?.defaultValue && (
						<p>{parameterErrors.defaultValue.message}</p>
					)}
				</>
			);

		case "BOOLEAN":
			return (
				<>
					<label>Default Value</label>
					<label>
						<input
							type="radio"
							value="true"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						True
					</label>
					<label>
						<input
							type="radio"
							value="false"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						False
					</label>
					{parameterErrors?.defaultValue && (
						<p>{parameterErrors.defaultValue.message}</p>
					)}
				</>
			);

		case "FLAG":
			return (
				<>
					<label>Default Value</label>
					<label>
						<input
							type="radio"
							value="On"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						On
					</label>
					<label>
						<input
							type="radio"
							value="Off"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						Off
					</label>
					{parameterErrors?.defaultValue && (
						<p>{parameterErrors.defaultValue.message}</p>
					)}
				</>
			);

		default:
			return <></>;
	}
};

// Utils object
const CommandCreationUtils = {
	StringParameterFields,
	IntParameterFields,
	BooleanParameterFields,
	DropdownParameterFields,
	FlagParameterFields,
	StringParameterSchema,
	IntParameterSchema,
	BooleanParameterSchema,
	DropdownParameterSchema,
	FlagParameterSchema,
};

// Exporting utils and types
export { CommandCreationUtils };
export type {
	StringParameter,
	IntParameter,
	BooleanParameter,
	DropdownParameter,
	FlagParameter,
	AnyParameter,
	StringParameterErrors,
	IntParameterErrors,
	DropdownParameterErrors,
	FlagParameterErrors,
};
