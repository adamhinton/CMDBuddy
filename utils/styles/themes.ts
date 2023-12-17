import { DefaultTheme } from "styled-components";

// These are dummy themes for proof of concept, will flesh out later
export const lightTheme: DefaultTheme = {
	colors: {
		background: "#fff",
		text: "#333",
		tabBackground: "#e0e0e0",
		activeTabBackground: "#c0c0c0",
		hoverTabBackground: "#d0d0d0",
	},
};

export const darkTheme: DefaultTheme = {
	colors: {
		background: "#1a1a1a",
		text: "#f5f5f5",
		tabBackground: "#333",
		activeTabBackground: "#222",
		hoverTabBackground: "#444",
	},
};
