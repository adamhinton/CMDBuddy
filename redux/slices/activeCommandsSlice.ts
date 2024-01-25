// README:
// This tracks what commands (if any) the user is currently filling out Parameter values for.
// The user selects a Command from Sidebar and that pops up in CommandExecutionForm.tsx
// There can be multiple Commands displayed.
// This just stores the Commands' ids, which will then be looked up in commandsSlice.

// NOTE: This is for Commands that already exist in the DB; they are filling out values for the Parameter keys.
// If they want to make a new Command with new Parameter keys, they should be filling out CommandCreationForm.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Adjusting the ActiveCommand type to include isCollapsed
type ActiveCommand = {
	id: string;
	isCollapsed: boolean;
};

interface ActiveCommandsState {
	activeCommands: ActiveCommand[];
}

const initialState: ActiveCommandsState = {
	activeCommands: [],
};

export const activeCommandsSlice = createSlice({
	name: "activeCommands",
	initialState,
	reducers: {
		addNewActiveCommand: (state, action: PayloadAction<ActiveCommand>) => {
			const { id: commandIDToAdd } = action.payload;

			// Check if the command ID already exists in the activeCommands array
			if (
				!state.activeCommands.find((command) => command.id === commandIDToAdd)
			) {
				// If it doesn't exist, add the new ActiveCommand object
				state.activeCommands.unshift(action.payload); // Now unshifting the whole object
			}
			// If the ID already exists, do nothing
		},

		/**Only removes the command from active command generation; doesn't delete them from the DB */
		removeSingleActiveCommandByID: (state, action: PayloadAction<string>) => {
			const commandIDToRemove = action.payload;
			// Filter based on command ID
			state.activeCommands = state.activeCommands.filter(
				(command) => command.id !== commandIDToRemove
			);
		},

		/**Only removes them from active command generation; doesn't delete them from the DB */
		deleteAllActiveCommands: (state) => {
			state.activeCommands = [];
		},

		/**Toggle isCollapsed state of active command */
		toggleCommandCollapseByID: (state, action: PayloadAction<string>) => {
			const commandIDToToggle = action.payload;
			const commandIndex = state.activeCommands.findIndex(
				(command) => command.id === commandIDToToggle
			);
			if (commandIndex !== -1) {
				// Check if the command exists
				state.activeCommands[commandIndex].isCollapsed =
					!state.activeCommands[commandIndex].isCollapsed;
			}
		},
	},
});

export const {
	addNewActiveCommand,
	removeSingleActiveCommandByID,
	deleteAllActiveCommands,
	toggleCommandCollapseByID,
} = activeCommandsSlice.actions;

export default activeCommandsSlice.reducer;
