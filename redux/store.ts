import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commandsReducer from "./slices/commandsSlice";
import darkModeReducer from "./slices/darkModeSlice";
import activeCommandsReducer from "./slices/activeCommandsSlice";
import editCommandReducer from "./slices/editCommandSlice";

if (typeof authReducer !== "function") {
	console.error("authReducer is not a valid reducer function");
}

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
