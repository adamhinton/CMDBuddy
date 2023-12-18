"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CMDBuddyCommand } from "../../../../utils/zod/CommandSchema";
import CommandExecutionForm from "@/components/CommandExecutionComponents/CommandExecutionForm";
Amplify.configure({ ...config, ssr: true });

export default function ActiveCommandsPage() {
	// This is all the ids of the commands the user has selected
	const activeCommandIDs = useSelector((state: RootState) => {
		return state.activeCommands.activeCommands;
	});

	// This is all the user's commands
	const allCommands: CMDBuddyCommand[] | null = useSelector(
		(state: RootState) => {
			return state.commands.commands;
		}
	);

	// Filter 'allCommands' to include only those present in 'activeCommandIDs'
	const activeCommands: CMDBuddyCommand[] =
		allCommands?.filter((command) => activeCommandIDs.includes(command.id)) ||
		[];

	if (activeCommandIDs.length === 0) {
		return <h3>Select some commands to start generating!</h3>;
	}

	return (
		<div>
			{activeCommands.map((command) => (
				// Render each active command here
				<CommandExecutionForm key={command.id} command={command} />
			))}
		</div>
	);
}
