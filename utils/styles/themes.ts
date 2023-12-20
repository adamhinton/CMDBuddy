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
	header: {
		background: "#E0F7FA", // Light blue background
		text: "#0D47A1", // Dark blue text
		link: "#004D40", // Teal for links
		toggleIcon: "#FFCA28", // Sun icon color
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
	header: {
		background: "#263238", // Dark slate background
		text: "#ECEFF1", // Light gray text
		link: "#80CBC4", // Soft teal for links
		toggleIcon: "#FFEB3B", // Moon icon color
	},
};
