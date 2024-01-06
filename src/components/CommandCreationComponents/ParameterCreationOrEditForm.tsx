"use client";

// README:
// This is the exact same whether it's in "edit command/parameters" mode or "create command/parameters" mode
// User fills this form out to make a Parameter
// Param can be STRING, INT, BOOLEAN, DROPDOWN or FLAG
// Different fields in form for each type
// User can add as many Parameters as they want; they fill out this form once per Parameter
// FLAG Is stuff like `--headed` or `--all` which you either include in the command or don't.
// BOOLEAN is a true/false variable, like `isLookingForJob=true`

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
	ParameterCreationButton,
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
};

import { FlagParameterErrors } from "../../../utils/CommandCreationUtils/CommandCreationUtils";
import { StyledCCFButton } from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import { CMDBuddyCommandFormValidation } from "./CommandCreationOrEditForm";
import styled from "styled-components";

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
			<CollapsibleBar
				onClick={(e) => {
					e.preventDefault();
					const param = getValues(`parameters.${index}`);
					update(index, { ...param, isCollapsed: !isCollapsed });
				}}
			>
				<ParameterName>ParameterName</ParameterName>
				<IconWrapper>
					{isCollapsed ? (
						<StyledDownPlaceholder>Down</StyledDownPlaceholder>
					) : (
						<StyledUpPlaceholder>Up</StyledUpPlaceholder>
					)}
					<StyledTrashPlaceholder
						onClick={(e) => {
							e.preventDefault();
							removeParameter(index);
						}}
					>
						Delete PH
					</StyledTrashPlaceholder>
				</IconWrapper>
			</CollapsibleBar>

			{!isCollapsed && (
				<div>
					<StyledCCFButton
						onClick={(e) => {
							e.preventDefault();
							const param = getValues(`parameters.${index}`);
							update(index, { ...param, isCollapsed: !isCollapsed });
						}}
					>
						{isCollapsed ? "Uncollapse" : "Collapse"}
					</StyledCCFButton>
					{/* Parameter Type Selector */}
					<ParameterCreationLabel>Type</ParameterCreationLabel>
					<ParameterCreationSelect
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
					</ParameterCreationSelect>
					{/* Shared Name Field */}
					<ParameterCreationLabel>Name</ParameterCreationLabel>
					<StyledPCFNameInput
						{...register(`parameters.${index}.name`)}
						placeholder="Name"
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

const CollapsibleBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.commandCreation.buttonBackground};
	border-radius: 4px;
	margin-bottom: 5px;
	background-color: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandCreation.buttonHoverBackground};
	}
`;

const ParameterName = styled.span`
	font-weight: bold;
	color: ${({ theme }) => theme.commandCreation.inputText};
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px; // Distance between icons
`;

const StyledDownPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

const StyledUpPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

const StyledTrashPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.errorText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;
