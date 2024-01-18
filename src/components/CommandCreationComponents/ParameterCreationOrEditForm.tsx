"use client";

// README:
// This is the exact same whether it's in "edit command/parameters" mode or "create command/parameters" mode
// User fills this form out to make a Parameter
// Param can be STRING, INT, BOOLEAN, DROPDOWN or FLAG
// Different fields in form for each type
// User can add as many Parameters as they want; they fill out this form once per Parameter
// FLAG Is stuff like `--headed` or `--all` which you either include in the command or don't.
// BOOLEAN is a true/false variable, like `isLookingForJob=true`

// TODO: General PCF Cleanup
// -- Better dropdown text input styling
// -- Better borders, spacing etc
// -- Clearer toolbar and icons

// TODO: Improve validation styling.
// -- Collapse valid params
// -- Highlight invalid params
// -- Toast

// TODO:
// In creation mode, add "What's this?" with link to explanation in /about. Particularly for Type

import React, { useState, useEffect } from "react";
import {
	UseFieldArrayUpdate,
	UseFormGetValues,
	useFormContext,
} from "react-hook-form";
import {
	CommandCreationUIElements,
	DefaultValueInput,
} from "../../../utils/CommandCreationUtils/CommandCreationUtils";

import {
	ParameterCreationError,
	ParameterCreationFormContainer,
	ParameterCreationInput,
	ParameterCreationLabel,
	ParameterCreationSelect,
	StyledPCFNameInput,
	StyledPCFOptionalCheckbox,
} from "../../../utils/styles/CommandCreationStyles/ParameterCreationStyles";
import {
	StringParameterErrors,
	IntParameterErrors,
	DropdownParameterErrors,
} from "../../../utils/CommandCreationUtils/CommandCreationUtils";

import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";

type FormProps = {
	index: number;
	removeParameter: Function;
	parameterCreationType: ParameterCreationType;
	setValue: Function;
	isCollapsed: boolean;
	update: UseFieldArrayUpdate<CMDBuddyCommandFormValidation>;
	getValues: UseFormGetValues<CMDBuddyCommandFormValidation>;
	dragHandleProps: any;
};

import { FlagParameterErrors } from "../../../utils/CommandCreationUtils/CommandCreationUtils";
import {
	CollapsibleBar,
	IconWrapper,
	ParameterName,
	StyledTrashIcon,
	StyledUpDownIcon,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import { CMDBuddyCommandFormValidation } from "./CommandCreationOrEditForm";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import { DragHandle } from "../../../utils/SideBarUtils";

const {
	StringParameterFields,
	IntParameterFields,
	BooleanParameterFields,
	DropdownParameterFields,
	FlagParameterFields,
} = CommandCreationUIElements;

export type ParameterCreationType =
	| "STRING"
	| "INT"
	| "BOOLEAN"
	| "DROPDOWN"
	| "FLAG";

// User fills this out once for every Parameter they create
const ParameterCreationOrEditForm = ({
	index,
	removeParameter,
	parameterCreationType,
	isCollapsed,
	setValue,
	update,
	getValues,
	dragHandleProps,
}: FormProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<{ parameters: AnyParameter[] }>();

	const [parameterType, setParameterType] = useState<ParameterCreationType>(
		parameterCreationType
	);

	const parameterErrors = errors.parameters?.[index];

	// This updates the necessary fields when user clicks a different parameter type
	// Name here refers to the name of the field, not the `name` key in Parameters
	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			const parameter = value.parameters ? value.parameters[index] : null;

			if (type === "change" && name?.includes(`parameters.${index}.type`)) {
				if (parameter) {
					setParameterType(parameter.type!);
				}
			}
			if (
				type === "change" &&
				parameter?.hasBeenEdited !== true &&
				name?.includes(`parameters.${index}`)
			) {
				setValue(`parameters.${index}.hasBeenEdited`, true);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, index, setValue]);

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
		<ParameterCreationFormContainer>
			<CMDBuddyTooltip content="Click to expand/collapse parameter creation UI">
				<CollapsibleBar
					onClick={(e) => {
						e.preventDefault();
						const param = getValues(`parameters.${index}`);
						update(index, { ...param, isCollapsed: !isCollapsed });
					}}
				>
					<ParameterName>{getValues(`parameters.${index}`).name}</ParameterName>

					<DragHandle {...dragHandleProps} onClick={(e) => e.stopPropagation()}>
						::
					</DragHandle>
					<IconWrapper>
						<CMDBuddyTooltip content={isCollapsed ? "Expand" : "Collapse"}>
							<StyledUpDownIcon
								className={`fas fa-chevron-${isCollapsed ? "down" : "up"}`}
							/>
						</CMDBuddyTooltip>
						<CMDBuddyTooltip content="Delete Parameter">
							<StyledTrashIcon
								className="fas fa-trash-alt"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									removeParameter();
								}}
							/>
						</CMDBuddyTooltip>
					</IconWrapper>
				</CollapsibleBar>
			</CMDBuddyTooltip>
			{!isCollapsed && (
				<div>
					{/* Parameter Type Selector */}
					<CMDBuddyTooltip content="Parameter type options">
						<ParameterCreationLabel>Type</ParameterCreationLabel>
					</CMDBuddyTooltip>
					<ParameterCreationSelect
						{...register(`parameters.${index}.type`)}
						onChange={(e) =>
							setParameterType(e.target.value as ParameterCreationType)
						}
					>
						<option value="STRING">String</option>
						<option value="INT">Integer</option>
						<option value="BOOLEAN">Boolean</option>
						<CMDBuddyTooltip content="Make a list of possible values">
							<option value="DROPDOWN">Dropdown</option>
						</CMDBuddyTooltip>
						<CMDBuddyTooltip content="Optional tag after base command, like `--headed` in `npx playwright test --headed`">
							<option value="FLAG">Flag</option>
						</CMDBuddyTooltip>
					</ParameterCreationSelect>

					{/* Shared Name Field */}
					<CMDBuddyTooltip content="Variable's name">
						<ParameterCreationLabel>Name *</ParameterCreationLabel>
					</CMDBuddyTooltip>
					<StyledPCFNameInput
						{...register(`parameters.${index}.name`)}
						placeholder="Variable Name"
						required={true}
						maxLength={30}
					/>
					{parameterErrors?.name && (
						<ParameterCreationError>
							{parameterErrors.name.message}
						</ParameterCreationError>
					)}

					<DefaultValueInput
						type={parameterType}
						register={register}
						index={index}
						parameterErrors={parameterErrors}
					></DefaultValueInput>
					{/* IsNullable (Optional) Checkbox */}
					{/* This isn't needed in FLAG type */}
					{parameterType !== "FLAG" && (
						<StyledPCFOptionalCheckbox>
							<ParameterCreationLabel>Optional</ParameterCreationLabel>
							<ParameterCreationInput
								type="checkbox"
								{...register(`parameters.${index}.isNullable`)}
							/>
						</StyledPCFOptionalCheckbox>
					)}
					{renderParameterSpecificFields()}
					{/* Delete Parameter Button */}
				</div>
			)}
		</ParameterCreationFormContainer>
	);
};

export default ParameterCreationOrEditForm;
