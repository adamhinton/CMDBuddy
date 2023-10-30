// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commandsReducer from "./slices/commandsSlice";

if (typeof authReducer !== "function") {
	console.error("authReducer is not a valid reducer function");
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
		commands: commandsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
