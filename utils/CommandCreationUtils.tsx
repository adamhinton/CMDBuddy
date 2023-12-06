// README:
// This is the utils file for initial creation of user's Commands and each Command's Parameters to save to the db
// Most of this is for Parameters which are somewhat complex since there are four different types of Parameter, and different fields to complete for each.

import { z } from "zod";
import { ParameterSchema } from "./zod/ParameterSchema";
import { useFormContext } from "react-hook-form";
import { ParameterCreationType } from "@/components/CommandCreationComponents/ParameterCreationForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { API, graphqlOperation } from "aws-amplify";
import { createCommand, createParameter } from "@/graphql/mutations";
import { CMDBuddyCommandFormValidation } from "@/components/CommandCreationComponents/CommandCreationForm";
import { customGetCommandWithParameters } from "./customGraphQLQueries";
import { CMDBuddyCommand } from "./zod/CommandSchema";

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

// This validates a single Parameter on submit, catching a few things that Zod etc couldnt.
const validateParameterOnSubmit = (
	parameter: AnyParameter,
	index: number,
	methods: any,
	isValid: boolean
): boolean => {
	const { setError } = methods;

	if (parameter.type === "STRING") {
		// TODO: Validate defaultValue against regex
		if (
			parameter.minLength &&
			parameter.maxLength &&
			parameter.minLength > parameter.maxLength
		) {
			setError(`parameters.${index}.minLength`, {
				type: "manual",
				message: "Min length cannot be greater than max length.",
			});
			isValid = false;
		}
	} else if (parameter.type === "INT") {
		// TODO: Validate defaultValue against min and max
		if (
			parameter.minValue &&
			parameter.maxValue &&
			parameter.minValue > parameter.maxValue
		) {
			setError(`parameters.${index}.minValue`, {
				type: "manual",
				message: "Min value cannot be greater than max value.",
			});
			isValid = false;
		}

		// Couldn't think of any additional BOOLEAN validations
	} else if (parameter.type === "DROPDOWN") {
		if (
			parameter.defaultValue &&
			!parameter.allowedValues?.includes(parameter.defaultValue)
		) {
			setError(`parameters.${index}.defaultValue`, {
				type: "manual",
				message: "Default value must be in allowed values.",
			});
			isValid = false;
		}
		// Couldn't think of any additional FLAG validations
	}
	return isValid;
};

export const submitNewCommandAndParamsToDB = async (
	formData: CMDBuddyCommandFormValidation,
	userID: string
): Promise<CMDBuddyCommand> => {
	// Disable submit button and show toast
	// disableSubmitButton();
	// showToast("Submitting... Please do not close the page.");
	let completeCommand: CMDBuddyCommand | null = null;

	try {
		// Construct command input for GraphQL mutation
		const commandInput = {
			baseCommand: formData.baseCommand,
			title: formData.title,
			order: formData.order,
			userID: userID,
		};

		// Submit Command and get the new command's ID
		const commandResponse = await API.graphql(
			graphqlOperation(createCommand, { input: commandInput })
		);
		// @ts-ignore
		const newCommandID = commandResponse.data.createCommand.id;
		console.log("commandResponse:", commandResponse);

		// Submit each Parameter with the new command's ID
		const parameters = formData.parameters || [];
		for (const parameter of parameters) {
			const parameterInput = {
				...parameter,
				commandID: newCommandID,
			};
			await API.graphql(
				graphqlOperation(createParameter, { input: parameterInput })
			);
		}

		// Fetch the complete command with parameters from the database
		// Replace this with your actual fetch command function
		completeCommand = await fetchCommandWithParameters(newCommandID);

		console.log("completeCommand:", completeCommand);

		// Print the complete Command for now (later, you will update Redux state)
		console.log("Fetched Command with Parameters:", completeCommand);
	} catch (error) {
		// Handle any errors
		console.error("Error submitting command and parameters:", error);
		// showToast("Error in submission. Please try again.");
	} finally {
		// Re-enable submit button
		// enableSubmitButton();
		return completeCommand!;
	}
};

// Placeholder function for fetching Command with Parameters
// Replace this with your actual function to fetch command with parameters
const fetchCommandWithParameters = async (commandID: string) => {
	try {
		const response = await API.graphql(
			graphqlOperation(customGetCommandWithParameters, {
				id: commandID,
			})
		);
		// @ts-ignore
		const commandWithParameters = response.data?.getCommand;

		return commandWithParameters;
	} catch (error) {
		console.error("Error fetching command with parameters:", error);
		return null; // or handle the error as appropriate for your application
	}
};

// export objects
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
	validateParameterOnSubmit,
};

export { CommandCreationUtils };

// export types
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
