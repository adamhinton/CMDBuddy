import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Amplify, Auth } from "aws-amplify";
import config from "../../src/aws-exports";
import { CMDBuddyUser } from "../../utils/zod/UserSchema";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";
Amplify.configure({ config, ssr: true });
console.log("TODO: Account for logout in auth/commands reducers");

interface CommandsState {
	commands: null | CMDBuddyCommand[];
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
	},
});

export const { setCommands } = commandsSlice.actions;
export default commandsSlice.reducer;
