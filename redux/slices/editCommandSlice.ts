// README
// This deals with which command the user is editing at /commands/edit
// Can only take one command at a time

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

interface EditCommandState {
	commandToEdit: CMDBuddyCommand | null;
}

const initialState: EditCommandState = {
	commandToEdit: null,
};

export const editCommandSlice = createSlice({
	name: "commandToEdit",
	initialState,
	reducers: {
		setCommandToEdit: (state, action: PayloadAction<CMDBuddyCommand>) => {
			const newCommandToEdit = action.payload;
			state.commandToEdit = newCommandToEdit;
		},

		deleteCommandToEdit: (state) => {
			state.commandToEdit = null;
		},
	},
});

export const { setCommandToEdit, deleteCommandToEdit } =
	editCommandSlice.actions;

export default editCommandSlice.reducer;
