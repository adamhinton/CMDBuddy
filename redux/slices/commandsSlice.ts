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
	},
});

export const { setCommands, logOutCommands, addCommand } =
	commandsSlice.actions;
export default commandsSlice.reducer;
