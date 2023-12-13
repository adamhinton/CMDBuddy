// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commandsReducer from "./slices/commandsSlice";
import darkModeReducer from "./slices/darkModeSlice";
import activeCommandReducer from "./slices/activeCommandSlice";

if (typeof authReducer !== "function") {
	console.error("authReducer is not a valid reducer function");
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		commands: commandsReducer,
		darkMode: darkModeReducer,
		activeCommand: activeCommandReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
