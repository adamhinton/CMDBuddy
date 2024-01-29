import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../../redux/slices/authSlice";
import commandsReducer from "../../redux/slices/commandsSlice";
import darkModeReducer from "../../redux/slices/darkModeSlice";
import activeCommandsReducer from "../../redux/slices/activeCommandsSlice";
import editCommandReducer from "../../redux/slices/editCommandSlice";
import type { RenderOptions } from "@testing-library/react";
import { RootState } from "../../redux/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>;
	store?: any;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = configureStore({
			reducer: {
				// @ts-ignore
				auth: authReducer,
				commands: commandsReducer,
				darkMode: darkModeReducer,
				activeCommands: activeCommandsReducer,
				commandToEdit: editCommandReducer,
			},

			preloadedState,
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
