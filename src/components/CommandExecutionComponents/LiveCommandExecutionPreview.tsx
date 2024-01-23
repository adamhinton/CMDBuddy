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

import React from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import {
	CommandPreviewContainer,
	CopyButton,
} from "../../../utils/CommandCreationUtils/CommandPreviewStyles";

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
