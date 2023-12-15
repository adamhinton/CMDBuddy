// README:
// This component shows a preview of the Command with filled-in values during execution.
// It's updated every time a user inputs a value in a ParameterExecutionForm.
// This version is specifically for the execution phase, where users enter values for an existing command.
// We use a similar component, called LiveCommandCreationPreview, in command creation.

import React from "react";
import { useFormContext } from "react-hook-form";
import { CMDBuddyParameter } from "../../../utils/zod/ParameterSchema";

const LiveCommandExecutionPreview = ({
	baseCommand,
	parameters,
}: {
	baseCommand: string;
	parameters: CMDBuddyParameter[] | undefined;
}) => {
	const { watch } = useFormContext();

	// Build the command preview with actual values entered by the user
	let commandPreview = baseCommand;

	// Add the user-inputted value for each parameter
	// This accounts for defaultValue
	parameters?.forEach((param) => {
		const value = watch(param.name);
		if (param.type === "FLAG") {
			if (value === "On") {
				// Append flag only if value is "On"
				commandPreview += ` ${param.name}`;
			}
		} else {
			commandPreview += ` ${param.name}=${value || ""}`;
		}
	});
	// NOTE: FLAG type Parameters go *after* the baseCommand; everything else goes *before* the baseCommand.

	return <div>{commandPreview}</div>;
};

export default LiveCommandExecutionPreview;
