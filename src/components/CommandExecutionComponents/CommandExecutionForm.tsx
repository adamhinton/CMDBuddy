"use client";

// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationOrEditForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values And displays the completed command on the page.
// User can click button to collapse this UI to reduce clutter.
// IMPORTANT NOTE about errors: The user has control of this process. The app validates their Parameter value inputs and alerts them if there's an error (e.g. the input is longer than their specified maxLength), but it doesn't stop the user from generating/copying the command. It's only a guideline.

import {
	removeSingleActiveCommandByID,
	toggleCommandCollapseByID,
} from "../../../redux/slices/activeCommandsSlice";
import { useDispatch, useSelector } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import LiveCommandExecutionPreview, {
	copyCommandToClipboard,
} from "./LiveCommandExecutionPreview";
import CEFStyles from "../../../utils/CommandExecutionUtils/CommandExecutionStyles";
import { CMDBuddyCommandWithIsCollapsed } from "@/app/commands/generate/page";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
// These items are shared with CommandCreationForm as well
import {
	CollapsibleBar,
	IconWrapper,
	StyledIconImage,
	StyledGeneralIcon,
} from "../../../utils/styles/CommandCreationStyles/CommandCreationStyles";
import downChevronLightMode from "../../../utils/images/chevrons/down-chevron-lightmode.svg";
import downChevronDarkMode from "../../../utils/images/chevrons/down-chevron-darkmode.svg";
import exitIconLightMode from "../../../utils/images/exit-icon-lightmode.svg";
import exitIconDarkMode from "../../../utils/images/exit-icon-darkmode.svg";
import { RootState } from "../../../redux/store";
import resetIconLightMode from "../../../utils/images/reset icons/reset-icon-lightmode.svg";
import resetIconDarkMode from "../../../utils/images/reset icons/reset-icon-darkmode.svg";
import {
	ClipboardCopyIconContainer,
	CopyButton,
} from "../../../utils/CommandCreationUtils/CommandPreviewStyles";
import copyToClipboardIcon from "../../../utils/images/copy-to-clipboard-icon.png";
import Image from "next/image";
import { Dispatch } from "redux";

const {
	ErrorItem,
	ErrorContainer,
	CEFForm,
	CEFHeader,
	CEFCommandTitle,
	CEFParametersContainer,
} = CEFStyles;

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Dispatch
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommandByID(commandID));
};
export type CEFDefaultValues = Record<string, any>;

const CommandExecutionForm = ({
	command,
}: {
	command: Readonly<CMDBuddyCommandWithIsCollapsed>;
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

	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	const [generatedCommandPreview, setGeneratedCommandPreview] = useState("");

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
						<StyledGeneralIcon>
							<StyledIconImage
								src={isDarkMode ? downChevronDarkMode : downChevronLightMode}
								alt={
									command.isCollapsed ? "Click to expand" : "Click to Collapse"
								}
								// React makes me pass in a string here
								iscollapsed={command.isCollapsed ? "true" : "false"}
							/>
						</StyledGeneralIcon>
					</CMDBuddyTooltip>

					{/* Show "copy to clipboard" icon --- but only when form is collapsed, because the copy icon already shows elsewhere when not collapsed */}
					{command.isCollapsed && (
						// This copy icon is also used in LCEP.tsx
						<CMDBuddyTooltip content="Copy generated Command to clipboard">
							<CopyButton
								onClick={(e) =>
									copyCommandToClipboard(e, generatedCommandPreview)
								}
								aria-label="Copy to clipboard"
							>
								<ClipboardCopyIconContainer>
									<Image
										src={copyToClipboardIcon}
										alt="Copy to clipboard"
										width={24}
										height={24}
										layout="intrinsic"
									/>
								</ClipboardCopyIconContainer>
							</CopyButton>
						</CMDBuddyTooltip>
					)}

					{/* Only show "reset" icon when command isn't collapsed */}
					{!command.isCollapsed && (
						<IconWrapper>
							<CMDBuddyTooltip content="Reset to default values">
								<StyledGeneralIcon>
									<StyledIconImage
										src={isDarkMode ? resetIconDarkMode : resetIconLightMode}
										alt="Reset to default values"
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											// Stop click from bubbling up to the "collapse" onClick, which would toggle collapse unintentionally
											methods.reset();
										}}
									/>
								</StyledGeneralIcon>
							</CMDBuddyTooltip>
						</IconWrapper>
					)}

					<IconWrapper>
						<CMDBuddyTooltip content="Exit this command">
							<StyledGeneralIcon
								onClick={(e) => {
									// @ts-ignore
									removeCommandOnClick(e, command.id, dispatch);
								}}
							>
								<StyledIconImage
									src={isDarkMode ? exitIconDarkMode : exitIconLightMode}
									alt="Exit this command"
								/>
							</StyledGeneralIcon>
						</CMDBuddyTooltip>
					</IconWrapper>
				</CollapsibleBar>

				{!command.isCollapsed && (
					<>
						{errorList.length > 0 && (
							<ErrorContainer>{errorList}</ErrorContainer>
						)}
						<LiveCommandExecutionPreview
							baseCommand={command.baseCommand}
							parameters={command.parameters}
							setGeneratedCommandPreview={setGeneratedCommandPreview}
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
