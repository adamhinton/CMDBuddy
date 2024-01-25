"use client";

// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationOrEditForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values And displays the completed command on the page.
// User can click button to collapse this UI to reduce clutter.
// IMPORTANT NOTE about errors: The user has control of this process. The app validates their Parameter value inputs and alerts them if there's an error (e.g. the input is longer than their specified maxLength), but it doesn't stop the user from generating/copying the command. It's only a guideline.

// TODO: Persist CEF state when navigating away. Maybe save form state as sub-value in activeCommands
// TODO: Custom input in dropdown
// TODO Stretch: DnD CEFs in commands/generate

// TODO Stretch: In PEF, on hover over a param, show its attributes (maxLength etc)

// TODO: Clean up CEF collapse styling:
//	-- Figure out collapsibleBar look
//  -- Make the whole UI of it smaller when collapsed, like smaller fonts etc
//  -- probably put copy button in collapsible bar

// TODO: CEF Errors with integer. These had default values and no default values; no max or min. Figure it out and fix it.
// numBobs nodef: The value cannot be greater than null.
// numBobsDef4: The value cannot be greater than null.

import {
	removeSingleActiveCommandByID,
	toggleCommandCollapseByID,
} from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import LiveCommandExecutionPreview from "./LiveCommandExecutionPreview";
import CEFStyles from "../../../utils/CommandExecutionUtils/CommandExecutionStyles";
import { CMDBuddyCommandWithIsCollapsed } from "@/app/commands/generate/page";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import {
	CollapsibleBar,
	StyledChevronImage,
	StyledUpDownIcon,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import downChevron from "../../../utils/images/chevrons/down-chevron.svg";
import rightChevron from "../../../utils/images/chevrons/right-chevron.svg";

const {
	ErrorItem,
	ErrorContainer,
	CEFForm,
	CEFHeader,
	CEFCommandTitle,
	CEFButton,
	CEFParametersContainer,
} = CEFStyles;

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Function
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommandByID(commandID));
};
export type CEFDefaultValues = Record<string, any>;

const CommandExecutionForm = ({
	command,
}: {
	command: CMDBuddyCommandWithIsCollapsed;
}) => {
	const methods = useForm({
		// This looks weird but it just sets each parameter's initial value to its defaultValue (if any)
		defaultValues: command.parameters?.reduce(
			(acc: CEFDefaultValues, param) => {
				acc[param.name] = param.defaultValue || ""; // Set default value or fallback to empty string
				return acc;
			},
			{} as CEFDefaultValues
		),
	});

	const dispatch = useDispatch();
	const parameters = command.parameters;

	// Error handling
	// Display parameter errors here rather than in individual Parameter inputs to reduce clutter
	// This displays a max of three errors at a time
	// Shows parameter's name and a brief error message
	const errors = methods.formState.errors;
	// This function will create a list of error elements
	const errorList = Object.keys(errors)
		.slice(0, 3) // Limit to a maximum of three errors
		.map((key) => (
			<ErrorItem key={key}>{`${key}: ${errors[key]!.message}`}</ErrorItem>
		));

	return (
		<FormProvider {...methods}>
			<CEFForm>
				<CEFHeader>
					<CEFCommandTitle>{command.title}</CEFCommandTitle>
				</CEFHeader>

				<CollapsibleBar
					onClick={(e) => {
						e.preventDefault();
						dispatch(toggleCommandCollapseByID(command.id));
					}}
				>
					<CMDBuddyTooltip
						content={command.isCollapsed ? "Expand" : "Collapse"}
					>
						<StyledUpDownIcon>
							<StyledChevronImage
								src={command.isCollapsed ? downChevron : rightChevron}
								alt={
									command.isCollapsed ? "Click to expand" : "Click to Collapse"
								}
							/>
						</StyledUpDownIcon>
					</CMDBuddyTooltip>

					{/* TODO: Make this an icon, and wrap it in IconWrapper */}
					<CEFButton
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
							// Stop click from bubbling up to the "collapse" onClick, which would toggle collapse unintentionally
							methods.reset();
						}}
					>
						Reset Inputs
					</CEFButton>

					{/* TODO: Make this an icon, and wrap it in IconWrapper */}
					<CMDBuddyTooltip content="Exit this command">
						<CEFButton
							onClick={(e) => {
								removeCommandOnClick(e, command.id, dispatch);
							}}
						>
							X
						</CEFButton>
					</CMDBuddyTooltip>
				</CollapsibleBar>

				{!command.isCollapsed && (
					<>
						{errorList.length > 0 && (
							<ErrorContainer>{errorList}</ErrorContainer>
						)}
						<LiveCommandExecutionPreview
							baseCommand={command.baseCommand}
							parameters={command.parameters}
						/>

						<CEFParametersContainer>
							{parameters?.map((param) => {
								return (
									<ParameterExecutionForm
										parameter={param}
										key={param.id}
										methods={methods}
									/>
								);
							})}
						</CEFParametersContainer>
					</>
				)}
			</CEFForm>
		</FormProvider>
	);
};
export default CommandExecutionForm;
