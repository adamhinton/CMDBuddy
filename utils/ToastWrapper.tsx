"use client";

// README:
// Using react-toastify to alert user of various things with toasts.

import { ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
	children: React.ReactNode;
}

export default function ToastWrapper({ children }: ToastProviderProps) {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
}

// Include this with every toast call
// Example: useToast("My toast message!", customToastConfig)
export const customToastConfig: ToastOptions = {
	delay: 7,
};

customToastConfig.draggable;
