// README:
// This is Redux state management for Commands AND PARAMETERS, they all live happily in the same state object. I did it this way because each Parameter has only one Command so it didn't make sense to separate them.
// Note, this is only client state management. Any database stuff is done elsewhere, often triggered by whatever called these reducers.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

interface CommandsState {
	commands: CMDBuddyCommand[] | null;
}

const initialState: CommandsState = {
	commands: null,
};

export const commandsSlice = createSlice({
	name: "commands",
	initialState,
	reducers: {
		setCommands: (state, action: PayloadAction<CMDBuddyCommand[]>) => {
			state.commands = action.payload;
		},

		logOutCommands: (state) => {
			state.commands = null;
		},

		addCommand: (state, action: PayloadAction<CMDBuddyCommand>) => {
			if (state.commands) {
				state.commands = [action.payload, ...state.commands];
			} else {
				state.commands = [action.payload];
			}
		},

		editCommandTitle: (
			state,
			action: PayloadAction<{ commandId: string; newTitle: string }>
		) => {
			const { commandId, newTitle } = action.payload;
			const command = state.commands?.find((cmd) => cmd.id === commandId);
			if (command) {
				command.title = newTitle;
			}
		},

		editSingleCommand: (state, action: PayloadAction<CMDBuddyCommand>) => {
			const updatedCommand = state.commands!.map((cmd) =>
				cmd.id === action.payload.id ? { ...cmd, ...action.payload } : cmd
			);
			return {
				...state,
				commands: updatedCommand,
			};
		},

		// pass in command
		deleteCommand: (state, action: PayloadAction<string>) => {
			const commandId = action.payload;
			state.commands =
				state.commands?.filter((cmd) => cmd.id !== commandId) || null;
			console.log("state.commands:", state.commands);
		},

		// Each command has an `order` property that determines what order they appear in the UI
		// When user drag and drops commands in the Sidebar that changes their order; this is the logic for that update.
		reorderCommands: (state, action: PayloadAction<CMDBuddyCommand[]>) => {
			const reorderedCommands = action.payload.map((command, index) => {
				return {
					...command,
					order: index + 1, // +1 because 'order' is 1-indexed
				};
			});

			state.commands = reorderedCommands;
		},
	},
});

export const {
	setCommands,
	logOutCommands,
	addCommand,
	deleteCommand,
	editCommandTitle,
	editSingleCommand,
	reorderCommands,
} = commandsSlice.actions;
export default commandsSlice.reducer;
