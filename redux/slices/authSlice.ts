import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Amplify } from "aws-amplify";
import config from "../../src/aws-exports";
import { CMDBuddyUser } from "../../utils/zod/UserSchema";

Amplify.configure({ config, ssr: true });

interface AuthState {
	user: null | CMDBuddyUser;
}

const initialState: AuthState = {
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<CMDBuddyUser>) => {
			state.user = action.payload;
		},
		logOut: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
