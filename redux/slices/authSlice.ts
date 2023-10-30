import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Amplify, Auth } from "aws-amplify";
import config from "../../src/aws-exports";
import { CMDBuddyUser } from "../../utils/zod/UserSchema";
Amplify.configure({ config, ssr: true });
console.log("TODO: Account for logout in auth reducer");

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
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
