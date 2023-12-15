// README:
// This tracks what command (if any) the user is currently filling out Parameter values for.
// The user selects a Command from Sidebar and that pops up in CommandExecutionForm.tsx

// NOTE: This is for Commands that already exist in the DB; they are filling out values for the Parameter keys.
// If they want to make a new Command with new Parameter keys, they should be filling out CommandCreationForm.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

interface activeCommandsState {
	activeCommands: null | CMDBuddyCommand;
}

const initialState: activeCommandsState = {
	activeCommands: null,
};

export const activeCommandsSlice = createSlice({
	name: "activeCommands",
	initialState,
	reducers: {
		setActiveCommands: (state, action: PayloadAction<CMDBuddyCommand>) => {
			state.activeCommands = action.payload;
		},

		deleteActiveCommands: (state) => {
			state.activeCommands = null;
		},
	},
});

export const { setActiveCommands, deleteActiveCommands } =
	activeCommandsSlice.actions;
export default activeCommandsSlice.reducer;
