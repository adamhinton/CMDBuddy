// README:
// Helper functions and styled components for SideBar.tsx and CommandInSideBar.tsx

import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import {
	updateCommand,
	deleteParameter,
	deleteCommand as deleteCommandMutation,
} from "@/graphql/mutations";
import { useDispatch } from "react-redux";
import { editCommandTitle, deleteCommand } from "../redux/slices/commandsSlice";
import { CMDBuddyCommand } from "./zod/CommandSchema";

// Styled components
export const SideBarContainer = styled.div`
	width: 250px;
	color: ${({ theme }) => theme.text};
	height: 100vh;
	overflow-y: auto;
	padding: 10px;
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

export const CommandContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const EditInput = styled.input`
	flex-grow: 1;
	border: 2px solid blue; /* Example outline style */
	padding: 4px;
	&:focus {
		outline: 3px solid green; /* More prominent outline when focused */
	}
`;

export const Title = styled.span`
	flex-grow: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const EditButton = styled.button`
	margin-right: 10px;
	background: none;
	border: none;
	cursor: pointer;
`;

export const DeleteButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

export const ConfirmIcon = styled.span`
	margin-left: 5px;
	cursor: pointer;
`;

// Utility functions
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
};
