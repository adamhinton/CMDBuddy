// README:
// Helper functions and styled components for SideBar.tsx and CommandInSideBar.tsx

import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import {
	updateCommand,
	deleteParameter,
	deleteCommand as deleteCommandMutation,
} from "@/graphql/mutations";
import { editCommandTitle, deleteCommand } from "../redux/slices/commandsSlice";
import { CMDBuddyCommand } from "./zod/CommandSchema";
import { reorderCommands } from "../redux/slices/commandsSlice";

// Styled components
export const SideBarContainer = styled.div`
	width: 250px;
	background: ${({ theme }) => theme.sidebar.background};
	color: ${({ theme }) => theme.sidebar.text};
	height: 100vh;
	overflow-y: auto;
	padding: 10px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const DragHandle = styled.div`
	width: 20px;
	height: 20px;
	background-color: #ccc;
	border-radius: 4px;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;

// Parent container of a single Command
export const CommandContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	margin: 5px 0;
	border-radius: 4px;
	// Ensure it doesn't grow beyond its container
	width: calc(100% - 16px);
	box-sizing: border-box;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
`;

// Input for editing command's title
export const EditInput = styled.input`
	flex-grow: 1;
	border: 2px solid blue;
	padding: 4px;
	&:focus {
		outline: 3px solid green;
	}
	max-width: 60%;
`;

// Command's Title
export const Title = styled.span`
	flex-grow: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const SaveCancelDNDContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px;
	background: ${({ theme }) =>
		theme.sidebar.background}; // Match the sidebar background
	border-bottom: 1px solid ${({ theme }) => theme.sidebar.dividerColor}; // Divider color in your theme
`;

export const SaveCancelDNDButton = styled.button`
	margin: 0 5px;
	padding: 5px 10px;
	background-color: ${({ theme }) =>
		theme.sidebar.buttons.background}; // Define button colors in your theme
	color: ${({ theme }) => theme.sidebar.buttons.text};
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.sidebar.buttons.hoverBackground};
	}
`;

export const EditButton = styled.button`
	margin-right: 10px;
	background: none;
	border: none;
	cursor: pointer;
	&:hover {
		color: blue;
	}
`;

// Trash icon to delete Command
export const DeleteButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	&:hover {
		color: red;
	}
`;

// Confirm deleting Command
export const ConfirmIcon = styled.span`
	margin-left: 5px;
	cursor: pointer;
`;

// Utility functions

// User has saved their DnD changes to command order, so save that to redux state and db
const handleDnDSave = async (
	localCommands: CMDBuddyCommand[],
	dispatch: Function,
	originalCommands: CMDBuddyCommand[],
	setHasChanges: Function,
	setLocalCommands: Function
) => {
	// Assign new order based on the current index in localCommands
	const updatedCommands = localCommands.map((cmd, index) => ({
		...cmd,
		order: index + 1,
	}));

	// Create a map of the original order for quick lookup
	const originalOrderMap = new Map(
		originalCommands!.map((cmd) => [cmd.id, cmd.order])
	);

	// Find commands whose order has changed
	const commandsToUpdate = updatedCommands.filter(
		(cmd) => originalOrderMap.get(cmd.id) !== cmd.order
	);

	// Dispatch the updatedCommands array to Redux
	dispatch(reorderCommands(updatedCommands));
	setHasChanges(false);

	// Update each changed command in the database
	for (const command of commandsToUpdate) {
		const input = {
			id: command.id,
			order: command.order,
		};

		try {
			const newCommandWithOrder = await API.graphql(
				graphqlOperation(updateCommand, { input })
			);
		} catch (error) {
			console.error("Error updating command:", error);
		}
	}
};

const handleCommandTitlesEditSubmit = async (
	commandID: string,
	editedTitle: string,
	dispatch: Function
) => {
	// Optimistic UI update
	dispatch(editCommandTitle({ commandId: commandID, newTitle: editedTitle }));

	// Update the database
	const commandDetails = { id: commandID, title: editedTitle };
	await API.graphql(graphqlOperation(updateCommand, { input: commandDetails }));
};

const handleCommandDelete = async (
	command: CMDBuddyCommand,
	dispatch: Function
) => {
	console.log("handleCommandDelete in sidebarutils");
	// Optimistic UI update
	dispatch(deleteCommand(command.id));

	// Delete each parameter
	if (command.parameters && command.parameters.length > 0) {
		for (const parameter of command.parameters) {
			await API.graphql(
				graphqlOperation(deleteParameter, {
					input: { id: parameter.id },
				})
			);
		}
	}

	// Delete the command from the database
	await API.graphql(
		graphqlOperation(deleteCommandMutation, { input: { id: command.id } })
	);
};

export const SideBarUtils = {
	handleCommandTitlesEditSubmit,
	handleCommandDelete,
	handleDnDSave,
};
