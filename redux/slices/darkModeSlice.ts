import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
	isDarkMode: boolean;
}

const initialState: DarkModeState = {
	isDarkMode: true,
};

export const darkModeSlice = createSlice({
	name: "darkMode",
	initialState,
	reducers: {
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkMode = action.payload;
		},
	},
});

export const { setIsDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
