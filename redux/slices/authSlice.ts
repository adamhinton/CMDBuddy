import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Amplify, Auth } from "aws-amplify";
import config from "../../src/aws-exports";
Amplify.configure({ config, ssr: true });
console.log("TODO: Account for logout in auth reducer");

interface AuthState {
	user: null | { [key: string]: any };
}

const initialState: AuthState = {
	user: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
	const userInfo = await Auth.currentUserInfo();
	return userInfo;
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ [key: string]: any }>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
