// README:
// This tracks what commands (if any) the user is currently filling out Parameter values for.
// The user selects a Command from Sidebar and that pops up in CommandExecutionForm.tsx
// There can be multiple Commands displayed.
// This just stores the Commands' ids, which will then be looked up in commandsSlice.

// NOTE: This is for Commands that already exist in the DB; they are filling out values for the Parameter keys.
// If they want to make a new Command with new Parameter keys, they should be filling out CommandCreationForm.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActiveCommandID = string;

interface ActiveCommandsState {
	activeCommands: ActiveCommandID[];
}

const initialState: ActiveCommandsState = {
	activeCommands: [],
};

export const activeCommandsSlice = createSlice({
	name: "activeCommands",
	initialState,
	reducers: {
		setActiveCommands: (state, action: PayloadAction<ActiveCommandID[]>) => {
			state.activeCommands = action.payload;
		},
		addNewActiveCommand: (state, action: PayloadAction<ActiveCommandID>) => {
			state.activeCommands.unshift(action.payload);
		},
		removeSingleActiveCommand: (
			state,
			action: PayloadAction<ActiveCommandID>
		) => {
			// Remove a command ID from the array
			state.activeCommands = state.activeCommands.filter(
				(id) => id !== action.payload
			);
		},
		deleteAllActiveCommands: (state) => {
			state.activeCommands = [];
		},
	},
});

export const {
	setActiveCommands,
	addNewActiveCommand,
	removeSingleActiveCommand,
	deleteAllActiveCommands,
} = activeCommandsSlice.actions;

export default activeCommandsSlice.reducer;
