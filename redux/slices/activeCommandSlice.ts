// README:
// This tracks what command (if any) the user is currently filling out Parameter values for.
// The user selects a Command from Sidebar and that pops up in CommandExecutionForm.tsx

// NOTE: This is for Commands that already exist in the DB; they are filling out values for the Parameter keys.
// If they want to make a new Command with new Parameter keys, they should be filling out CommandCreationForm.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

interface activeCommandState {
	activeCommand: null | CMDBuddyCommand;
}

const initialState: activeCommandState = {
	activeCommand: null,
};

export const activeCommandSlice = createSlice({
	name: "activeCommand",
	initialState,
	reducers: {
		setActiveCommand: (state, action: PayloadAction<CMDBuddyCommand>) => {
			state.activeCommand = action.payload;
		},

		deleteActiveCommand: (state) => {
			state.activeCommand = null;
		},
	},
});

export const { setActiveCommand, deleteActiveCommand } =
	activeCommandSlice.actions;
export default activeCommandSlice.reducer;
