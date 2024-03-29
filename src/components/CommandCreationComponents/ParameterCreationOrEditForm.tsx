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
	UseFormSetValue,
	useFormContext,
} from "react-hook-form";
import {
	CommandCreationUIElements,
	DefaultValueInput,
	renderParameterSpecificFields,
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
import downChevronLightMode from "../../../utils/images/chevrons/down-chevron-lightmode.svg";
import downChevronDarkMode from "../../../utils/images/chevrons/down-chevron-darkmode.svg";
import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import DragNDropHandleIcon from "../../../utils/images/drag-drop-handle.svg";

type FormProps = Readonly<{
	index: number;
	removeParameter: (index?: number | number[] | undefined) => void;
	parameterCreationType: ParameterCreationType;
	setValue: UseFormSetValue<CMDBuddyCommandFormValidation>;
	update: UseFieldArrayUpdate<CMDBuddyCommandFormValidation>;
	getValues: UseFormGetValues<CMDBuddyCommandFormValidation>;
	dragHandleProps: DraggableProvidedDragHandleProps;
}>;

import {
	CollapsibleBar,
	IconWrapper,
	ParameterName,
	StyledIconImage,
	StyledIcon,
	StyledGeneralIcon,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import { CMDBuddyCommandFormValidation } from "./CommandCreationOrEditForm";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import { DragHandle } from "../../../utils/SideBarUtils";
import { DragNDropIconImage } from "../../../utils/DragNDropUtils";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { StyledLink } from "../Header";

const {
	StringParameterFields,
	IntParameterFields,
	BooleanParameterFields,
	DropdownParameterFields,
	FlagParameterFields,
} = CommandCreationUIElements;

/**A Parameter can be one of five types
 *
 * This is a union of the string names for those types.
 */
export type ParameterCreationType =
	| "STRING"
	| "INT"
	| "BOOLEAN"
	| "DROPDOWN"
	| "FLAG";

/**User fills this out once for every Parameter they create */
const ParameterCreationOrEditForm = ({
	index,
	removeParameter,
	parameterCreationType,
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

	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	// Handle user changing parameter type (String, Int, Dropdown etc)
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

	/**User can toggle collapse/uncollapse of this form
	 *
	 * When collapsed it'll just show a toolbar
	 *
	 * On form submit, if a param has an error, that param will auto-expand; all params without errors will auto-collapse
	 */
	const isCollapsed = getValues(`parameters.${index}.isCollapsed`);

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
					<DragHandle {...dragHandleProps} onClick={(e) => e.stopPropagation()}>
						<DragNDropIconImage
							src={DragNDropHandleIcon}
							alt="Drag and drop icon; hold down to drag"
						/>
					</DragHandle>

					<CMDBuddyTooltip content={isCollapsed ? "Expand" : "Collapse"}>
						<StyledGeneralIcon>
							<StyledIconImage
								src={isDarkMode ? downChevronDarkMode : downChevronLightMode}
								alt={isCollapsed ? "Click to expand" : "Click to Collapse"}
								// React makes me pass in a string here
								iscollapsed={isCollapsed ? "true" : "false"}
							/>
						</StyledGeneralIcon>
					</CMDBuddyTooltip>

					<ParameterName>
						{getValues(`parameters.${index}`).name || "Param Name"}
					</ParameterName>

					<IconWrapper>
						<CMDBuddyTooltip content="Delete Parameter">
							<StyledIcon
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									removeParameter();
								}}
							>
								🗑️
							</StyledIcon>
						</CMDBuddyTooltip>
					</IconWrapper>
				</CollapsibleBar>
			</CMDBuddyTooltip>
			{!isCollapsed && (
				<div>
					{/* Parameter Type Selector */}
					<CMDBuddyTooltip content="Parameter type options">
						<ParameterCreationLabel>
							Type{" "}
							{/* Open in new tab because CCEF state isn't persisted right now */}
							<StyledLink href="/about#String%20Parameter" target="_blank">
								{"(What's this?)"}
							</StyledLink>
						</ParameterCreationLabel>
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

					{/* Render stuff specific to each Parameter's type */}
					{renderParameterSpecificFields(parameterType, parameterErrors, index)}
				</div>
			)}
		</ParameterCreationFormContainer>
	);
};

export default ParameterCreationOrEditForm;
