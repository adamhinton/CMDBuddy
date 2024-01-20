// README:
// This is the utils file for initial creation of user's Commands and each Command's Parameters to save to the db
// Most of this is for Parameters which are somewhat complex since there are four different types of Parameter, and different fields to complete for each.

// TODO: Break this up into PCU and CCU; file getting too long

import {
	UseFieldArrayUpdate,
	UseFormGetValues,
	useFormContext,
} from "react-hook-form";
import { ParameterCreationType } from "@/components/CommandCreationComponents/ParameterCreationOrEditForm";
import { UseFormRegister } from "react-hook-form";
import {
	ParameterCreationLabel,
	StyledPCFLengthInput,
	ParameterCreationError,
	ParameterCreationInput,
	StyledPCFMinMaxContainer,
	StyledPCFRadioInputContainer,
	ParameterCreationButton,
} from "../styles/CommandCreationStyles/ParameterCreationStyles";
import { CommandCreationZodSchemas } from "./CommandCreationTypes";
CommandCreationZodSchemas;

import { AnyParameter } from "./CommandCreationTypes";
import { CMDBuddyCommandFormValidation } from "@/components/CommandCreationComponents/CommandCreationOrEditForm";
import {
	ParamCreationButtonsContainer,
	PrimaryButton,
	SecondaryButton,
	StyledCCFButton,
} from "../styles/CommandCreationStyles/CommandCreationStyles";
import { CMDBuddyCommand } from "../zod/CommandSchema";
import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";

// Helper function to convert empty string to null bc schema expects null for some inputs if they're empty
const toNumberOrNullOrUndefined = (value: string) =>
	value === "" ? undefined : Number(value);

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
			<StyledPCFMinMaxContainer>
				{/* Min Length Field */}
				<ParameterCreationLabel>Min Length</ParameterCreationLabel>
				<StyledPCFLengthInput
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
				<StyledPCFLengthInput
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
			</StyledPCFMinMaxContainer>

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
			<StyledPCFMinMaxContainer>
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
			</StyledPCFMinMaxContainer>

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

// TODO: Move these Dropdown styled componenents to ParameterCreationStyles.
const TagInputContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: ${({ theme }) =>
		theme.commandCreation.dropdownBackgroundColor};
	border: 1px solid ${({ theme }) => theme.commandCreation.dropdownBorderColor};
	padding: 5px;
	border-radius: 5px;
`;

const Tag = styled.span`
	padding: 5px 8px;
	background-color: ${({ theme }) =>
		theme.commandCreation.dropdownTagBackgroundColor};
	color: ${({ theme }) => theme.commandCreation.dropdownTagTextColor};
	margin: 2px;
	border-radius: 3px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const RemoveTagIcon = styled.span`
	cursor: pointer;
	color: ${({ theme }) => theme.commandCreation.dropdownTagRemoveIconColor};
`;

const TagInput = styled.input`
	flex: 1;
	border: none;
	outline: none;
	padding: 5px;
	color: ${({ theme }) => theme.commandCreation.dropdownTextColor};
	background: transparent;
`;

/**
 * Creating a Dropdown component to list possible values for user to select
 *
 * This is a Tag system; the user types a value and hits enter. They can also delete Tags.
 */
const DropdownParameterFields = ({
	index,
	parameterErrors,
}: {
	index: number;
	parameterErrors: DropdownParameterErrors;
}) => {
	/**A single allowed dropdown value that the user inputs */
	type Tag = string;
	/**The list of user-inputted alowed dropdown values */
	type Tags = Tag[];

	const { register, setValue, getValues, watch } = useFormContext();
	const initialTags: Tags =
		getValues(`parameters.${index}.allowedValues`) || [];
	// tags is the list of values the user has already entered
	const [tags, setTags] = useState<Tags>(initialTags);
	// Whereas inputValue is the current value the user is typing but hasn't hit enter yet
	const [inputValue, setInputValue] = useState<string>("");

	// Watch for external changes in allowedValues
	const watchedValues = watch(`parameters.${index}.allowedValues`);
	useEffect(() => {
		if (Array.isArray(watchedValues)) {
			setTags(watchedValues);
		}
	}, [watchedValues]);

	/**User hits enter on every input */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputValue.trim()) {
			event.preventDefault();
			const newTag = inputValue.trim();
			const newTags = [...tags, newTag];
			setTags(newTags);
			setValue(`parameters.${index}.allowedValues`, newTags); // Set as array
			setInputValue(""); // Clear the input
		}
	};

	const removeTag = (tagToRemove: Tag) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);
		setValue(`parameters.${index}.allowedValues`, newTags); // Set as array
	};

	return (
		<>
			<ParameterCreationLabel>Allowed Values</ParameterCreationLabel>
			<TagInputContainer>
				{/* Display list of allowed dropdown values (tags) the user has inputted */}
				{tags.map((tag, index) => (
					<Tag key={index}>
						{tag}
						<RemoveTagIcon onClick={() => removeTag(tag)}>✖</RemoveTagIcon>
					</Tag>
				))}
				{/* User inputs a new allowed dropdown value (tag) here */}
				<TagInput
					{...register(`parameters.${index}.allowedValues`)}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder={tags.length ? "" : "Press enter to add new values"}
					onKeyDown={handleKeyDown}
				/>
			</TagInputContainer>
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

// Collapse all instances of PCF for cleaner UI
const collapseAllParams = (
	update: UseFieldArrayUpdate<CMDBuddyCommandFormValidation>,
	getValues: UseFormGetValues<CMDBuddyCommandFormValidation>
) => {
	const params = getValues(`parameters`);

	if (params && params.length > 0) {
		for (let i = 0; i < params.length; i++) {
			update(i, {
				...params[i],
				isCollapsed: true,
			});
		}
	}
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
	parameterErrors: any;
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
					<StyledPCFRadioInputContainer>
						<ParameterCreationLabel>True</ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="true"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						<ParameterCreationLabel>False</ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="false"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
					</StyledPCFRadioInputContainer>
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
					<StyledPCFRadioInputContainer>
						<ParameterCreationLabel>Default Value</ParameterCreationLabel>
						<ParameterCreationLabel>On</ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="On"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
						<ParameterCreationLabel>Off</ParameterCreationLabel>
						<ParameterCreationInput
							type="radio"
							value="Off"
							{...register(`parameters.${index}.defaultValue`)}
						/>{" "}
					</StyledPCFRadioInputContainer>

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

type ParameterCreationButtonProps = {
	collapseAllParams: (update: any, getValues: any) => void;
	update: any; // Define more specific type if known
	getValues: any; // Define more specific type if known
	append: (value: any) => void; // Define more specific type if known
	clearForm: () => void;
	isSubmitting: boolean;
	componentMode: "createNewCommand" | "editExistingCommand"; // Assuming these are the two modes
	commandToEdit: CMDBuddyCommand | null; // Assuming it can be null if not in edit mode
};

// Reusable parameter creation buttons: "Add new parameter", "Clear form", "Submit", "Collapse All Params"
const parameterCreationButtons: React.FC<ParameterCreationButtonProps> = ({
	collapseAllParams,
	update,
	getValues,
	append,
	clearForm,
	isSubmitting,
	componentMode,
	commandToEdit,
}) => {
	const appendValueIfCreationMode = {
		type: "STRING",
		name: "",
		isNullable: false,
		defaultValue: "",
		hasBeenEdited: false,
		isCollapsed: false,
	};

	const appendValueIfEditMode = {
		...appendValueIfCreationMode,
		commandID: commandToEdit?.id,
	};

	return (
		<ParamCreationButtonsContainer>
			<SecondaryButton
				type="button"
				onClick={() => {
					append(
						componentMode === "createNewCommand"
							? appendValueIfCreationMode
							: appendValueIfEditMode
					);
				}}
			>
				Add New Parameter
			</SecondaryButton>
			<SecondaryButton
				onClick={(e) => {
					e.preventDefault();
					collapseAllParams(update, getValues);
				}}
			>
				Collapse All Params
			</SecondaryButton>
			<SecondaryButton type="button" onClick={clearForm}>
				Clear Form
			</SecondaryButton>
			<PrimaryButton type="submit" disabled={isSubmitting}>
				Submit
			</PrimaryButton>
		</ParamCreationButtonsContainer>
	);
};

// export objects
export const CommandCreationUIElements = {
	StringParameterFields,
	IntParameterFields,
	BooleanParameterFields,
	DropdownParameterFields,
	FlagParameterFields,
	collapseAllParams,
	parameterCreationButtons,
};

export type {
	StringParameterErrors,
	IntParameterErrors,
	FlagParameterErrors,
	DropdownParameterErrors,
};
