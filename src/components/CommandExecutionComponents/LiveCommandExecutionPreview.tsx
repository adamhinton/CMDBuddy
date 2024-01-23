"use client";

// README:
// This component shows a preview of the Command with filled-in values during execution.
// It's updated every time a user inputs a value in a ParameterExecutionForm.
// This version is specifically for the execution phase, where users enter values for an existing command.
// FLAG type Parameters go *after* the baseCommand; everything else goes *before* the baseCommand.
// We use a similar component, called LiveCommandCreationPreview, in command creation. These files produce much the same UI, but the methods to achieve that are different enough that I made two components.
// STYLING:
// -- Since the UI is much the same, styling is shared between this and LiveCommandCreationPreview.tsx

// TODO Stretch: Inline vs one per line LCEP

// TODO: CEF Styling cleanup. Box shadows, spacing etc. It's close, shouldn't be too arduous.

// TODO: Move these styled-components to utils
export const CommandPreviewContainer = styled.section`
	padding: 10px;
	margin: 10px 0;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.commandPreview.background};
	color: ${({ theme }) => theme.commandPreview.text};
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	font-family: "Courier New", Courier, monospace;
	white-space: pre-wrap; // Ensures command wraps and maintains formatting
	overflow-x: auto; // Adds horizontal scrolling if command is too long

	& > code {
		display: block; // Makes the <code> fill the container
	}
`;

export const CopyButton = styled.button`
	cursor: pointer;
	border: none;
	background-color: ${({ theme }) => theme.commandPreview.buttonBackground};
	color: ${({ theme }) => theme.commandPreview.buttonText};
	padding: 5px 10px;
	border-radius: 3px;
	margin-left: 10px;

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandPreview.buttonHoverBackground};
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px ${({ theme }) => theme.commandPreview.focusShadow};
	}
`;

import React from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";
import styled from "styled-components";
import CEFStyles from "../../../utils/CommandExecutionUtils/CommandExecutionStyles";
const { CEFButton } = CEFStyles;
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
const LCEPContainer = styled.section`
	margin: 10px 0;
`;

const LiveCommandExecutionPreview = ({
	baseCommand,
	parameters,
}: {
	baseCommand: string;
	parameters: CMDBuddyParameter[] | undefined;
}) => {
	const { watch } = useFormContext();

	let preCommandParams = "";
	let postCommandFlags = "";

	parameters?.forEach((param) => {
		const value = watch(param.name);
		if (param.type === "FLAG") {
			if (value === "On") {
				postCommandFlags += ` ${param.name}`;
			}
		} else {
			preCommandParams += ` ${param.name}=${value || ""}`;
		}
	});

	// This is the preview of the generated Command
	const commandPreview =
		`${preCommandParams.trim()} ${baseCommand} ${postCommandFlags.trim()}`.trim();

	return (
		<CommandPreviewContainer>
			<code>{commandPreview}</code>
			{/* Clicking this button copies generated Command to clipboard */}
			<div>
				{" "}
				<CMDBuddyTooltip content="Copy generated Command to clipboard">
					<CopyButton
						onClick={(e) => copyCommandToClipboard(e, commandPreview)}
					>
						{/* TODO: Put an icon here instead of a button saying "Copy" */}
						Copy{" "}
					</CopyButton>
				</CMDBuddyTooltip>
			</div>
		</CommandPreviewContainer>
	);
};

export default LiveCommandExecutionPreview;

// Onclick to copy generated Command to clipboard
const copyCommandToClipboard = async (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandText: string
) => {
	e.preventDefault();
	try {
		await navigator.clipboard.writeText(commandText);
		alert("Command copied to clipboard!");
	} catch (err) {
		alert(`Failed to copy command to clipboard: ${err}`);
	}
};
