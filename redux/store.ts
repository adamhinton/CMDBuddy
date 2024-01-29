import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commandsReducer from "./slices/commandsSlice";
import darkModeReducer from "./slices/darkModeSlice";
import activeCommandsReducer from "./slices/activeCommandsSlice";
import editCommandReducer from "./slices/editCommandSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		commands: commandsReducer,
		darkMode: darkModeReducer,
		activeCommands: activeCommandsReducer,
		commandToEdit: editCommandReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
