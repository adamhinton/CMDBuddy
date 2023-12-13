// README:
// This tracks what command (if any) the user is currently filling out Parameter values for.
// The user selects a Command from Sidebar and that pops up in CommandExecutionForm.tsx

// NOTE: This is for Commands that already exist in the DB; they are filling out values for the Parameter keys.
// If they want to make a new Command with new Parameter keys, they should be filling out CommandCreationForm.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Amplify } from "aws-amplify";
import config from "../../src/aws-exports";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

interface CurrentlySelectedCommandState {
	currentlySelectedCommand: null | CMDBuddyCommand;
}

const initialState: CurrentlySelectedCommandState = {
	currentlySelectedCommand: null,
};

export const currentlySelectedCommandSlice = createSlice({
	name: "currentlySelectedCommand",
	initialState,
	reducers: {
		setCurrentlySelectedCommand: (
			state,
			action: PayloadAction<CMDBuddyCommand>
		) => {
			state.currentlySelectedCommand = action.payload;
		},

		deleteCurrentlySelectedCommand: (state) => {
			state.currentlySelectedCommand = null;
		},
	},
});

export const { setCurrentlySelectedCommand } =
	currentlySelectedCommandSlice.actions;
export default currentlySelectedCommandSlice.reducer;
