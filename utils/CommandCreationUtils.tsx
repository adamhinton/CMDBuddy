// README:
// This is the utils file for initial creation of user's Commands and each Command's Parameters to save to the db
// Most of this is for Parameters which are somewhat complex since there are four different types of Parameter, and different fields to complete for each.

import { z } from "zod";
import styled from "styled-components";
import { ParameterSchema } from "./zod/ParameterSchema";
import { useFormContext } from "react-hook-form";
import { ParameterCreationType } from "@/components/CommandCreationComponents/ParameterCreationForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { API, graphqlOperation } from "aws-amplify";
import { createCommand, createParameter } from "@/graphql/mutations";
import { CMDBuddyCommandFormValidation } from "@/components/CommandCreationComponents/CommandCreationForm";
import { customGetCommandWithParameters } from "./customGraphQLQueries";
import { CMDBuddyCommand } from "./zod/CommandSchema";

export const StyledCCFForm = styled.form`
	background: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 20px;
	border-radius: 8px;
	width: 100%;
`;

export const StyledCCFLabel = styled.label`
	display: block;
	margin-bottom: 5px;
`;

export const StyledCCFInput = styled.input`
	width: 300px;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const StyledCCFError = styled.p`
	color: ${({ theme }) => theme.commandCreation.errorText};
	margin-bottom: 10px;
`;

export const StyledCCFButton = styled.button`
	background: ${({ theme }) => theme.commandCreation.buttonBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

export const ParameterCreationFormContainer = styled.div`
	border: 1px solid blue;
	background: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 8px;
`;

export const ParameterCreationLabel = styled.label`
	display: block;
	margin-bottom: 5px;
	max-width: 100px;
`;

export const ParameterCreationInput = styled.input`
	max-width: 100%;
	display: block;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const ParameterCreationError = styled.p`
	color: ${({ theme }) => theme.commandCreation.errorText};
	margin-bottom: 10px;
`;

export const ParameterCreationSelect = styled.select`
	width: 100px;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const ParameterCreationButton = styled.button`
	background: ${({ theme }) => theme.commandCreation.buttonBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

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
			<ParameterCreationLabel>Min Length</ParameterCreationLabel>
			<ParameterCreationInput
				type="number"
				{...register(`parameters.${index}.minLength`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Min Length"
			/>
			{parameterErrors?.minLength && (
				<ParameterCreationError>
					{parameterErrors.minLength.message}
				</ParameterCreationError>
			)}

			{/* Max Length Field */}
			<ParameterCreationLabel>Max Length</ParameterCreationLabel>
			<ParameterCreationInput
				type="number"
				{...register(`parameters.${index}.maxLength`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Max Length"
			/>
			{parameterErrors?.maxLength && (
				<ParameterCreationError>
					{parameterErrors.maxLength.message}
				</ParameterCreationError>
			)}

			{/* Validation Regex Field */}
			<ParameterCreationLabel>Validation Regex</ParameterCreationLabel>
			<ParameterCreationInput
				{...register(`parameters.${index}.validationRegex`)}
				placeholder="Validation Regex"
				maxLength={100}
			/>
			{parameterErrors?.validationRegex && (
				<ParameterCreationError>
					{parameterErrors.validationRegex.message}
				</ParameterCreationError>
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
			<ParameterCreationLabel>Min Value</ParameterCreationLabel>
			<ParameterCreationInput
				type="number"
				{...register(`parameters.${index}.minValue`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Min Value"
			/>
			{parameterErrors?.minValue && (
				<ParameterCreationError>
					{parameterErrors.minValue.message}
				</ParameterCreationError>
			)}

			{/* Max Value Field */}
			<ParameterCreationLabel>Max Value</ParameterCreationLabel>
			<ParameterCreationInput
				type="number"
				{...register(`parameters.${index}.maxValue`, {
					setValueAs: toNumberOrNullOrUndefined,
				})}
				placeholder="Max Value"
			/>
			{parameterErrors?.maxValue && (
				<ParameterCreationError>
					{parameterErrors.maxValue.message}
				</ParameterCreationError>
			)}
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
			<ParameterCreationLabel>Allowed Values</ParameterCreationLabel>
			<textarea
				{...register(`parameters.${index}.allowedValues`, {
					setValueAs: stringToArray,
				})}
				placeholder="Enter values separated by commas"
				rows={4}
				maxLength={5000}
			/>
			{parameterErrors?.allowedValues && (
				<ParameterCreationError>
					{parameterErrors.allowedValues.message}
				</ParameterCreationError>
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
					<ParameterCreationLabel>Default Value</ParameterCreationLabel>
					<ParameterCreationInput
						type="text"
						{...register(`parameters.${index}.defaultValue`)}
						placeholder="Default Value"
						maxLength={1000}
					/>
					{parameterErrors?.defaultValue && (
						<ParameterCreationError>
							{parameterErrors.defaultValue.message}
						</ParameterCreationError>
					)}
				</>
			);

		case "INT":
			return (
				<>
					<ParameterCreationLabel>Default Value</ParameterCreationLabel>
					<ParameterCreationInput
						type="number"
						{...register(`parameters.${index}.defaultValue`)}
						placeholder="Number"
					/>
					{parameterErrors?.defaultValue && (
						<ParameterCreationError>
							{parameterErrors.defaultValue.message}
						</ParameterCreationError>
					)}
				</>
			);

		case "BOOLEAN":
			return (
				<>
					<ParameterCreationLabel>Default Value</ParameterCreationLabel>
					<ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="true"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						True
					</ParameterCreationLabel>
					<ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="false"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						False
					</ParameterCreationLabel>
					{parameterErrors?.defaultValue && (
						<ParameterCreationError>
							{parameterErrors.defaultValue.message}
						</ParameterCreationError>
					)}
				</>
			);

		case "FLAG":
			return (
				<>
					<ParameterCreationLabel>Default Value</ParameterCreationLabel>
					<ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="On"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						On
					</ParameterCreationLabel>
					<ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="Off"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						Off
					</ParameterCreationLabel>
					{parameterErrors?.defaultValue && (
						<ParameterCreationError>
							{parameterErrors.defaultValue.message}
						</ParameterCreationError>
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
	} catch (error) {
		console.error("Error submitting command and parameters:", error);
	} finally {
		return completeCommand!;
	}
};

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
		return null;
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
