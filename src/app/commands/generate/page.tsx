"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CMDBuddyCommand } from "../../../../utils/zod/CommandSchema";
import CommandExecutionForm from "@/components/CommandExecutionComponents/CommandExecutionForm";
import styled from "styled-components";
Amplify.configure({ ...config, ssr: true });

export default function ActiveCommandsPage() {
	/**An array of objects with just a commandID and isCollapsed */
	const activeCommands = useSelector((state: RootState) => {
		return state.activeCommands.activeCommands;
	});

	// This is all the user's commands
	const allCommands: CMDBuddyCommand[] | null = useSelector(
		(state: RootState) => {
			return state.commands.commands;
		}
	);

	/**Make list of active commands to render below
	 *
	 * Has to be filtered like this because activeCommands is just an array of objects with `id` and `isCollapsed`
	 */
	const filteredActiveCommands: CMDBuddyCommand[] =
		allCommands?.filter((command) =>
			activeCommands.some((activeCommand) => activeCommand.id === command.id)
		) || [];

	if (filteredActiveCommands.length === 0) {
		return <h3>Select some commands in the Sidebar to start generating!</h3>;
	}

	return (
		<CEFSectionContainer>
			{filteredActiveCommands.map((command) => (
				<CommandExecutionForm key={command.id} command={command} />
			))}
		</CEFSectionContainer>
	);
}

const CEFSectionContainer = styled.section`
	width: 100%;
`;
