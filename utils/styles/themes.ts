import { DefaultTheme } from "styled-components";

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
	tabs: {
		background: "#e0e0e0",
		text: "#333",
		activeBackground: "#c0c0c0",
		hoverBackground: "#d0d0d0",
		activeBorder: "#0D47A1", // The tab the user is currently on
	},
	sidebar: {
		background: "#f0f0f0",
		text: "#333",
		hoverBackground: "#e0e0e0",
		dividerColor: "#dcdcdc",
		buttons: {
			background: "#E0F7FA",
			text: "#0D47A1",
			hoverBackground: "#B3E5FC",
		},
	},
	commandCreation: {
		formBackground: "#E3F2FD",
		formText: "#0D47A1",
		inputBackground: "#FFFFFF",
		inputText: "#333333",
		errorText: "#D32F2F",
		buttonBackground: "#B3E5FC",
		buttonHoverBackground: "#81D4FA",
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
	tabs: {
		background: "#37474F",
		text: "#ECEFF1",
		activeBackground: "#263238",
		hoverBackground: "#455A64",
		activeBorder: "#80CBC4", // Soft teal border for active tab
	},
	sidebar: {
		background: "#2c3e50",
		text: "#ecf0f1",
		hoverBackground: "#34495e",
		dividerColor: "#34495e",
		buttons: {
			background: "#37474F",
			text: "#ECEFF1",
			hoverBackground: "#546E7A",
		},
	},
	commandCreation: {
		formBackground: "#37474F", // Darker background
		formText: "#ECEFF1", // Light text
		inputBackground: "#455A64", // Darker input background
		inputText: "#ECEFF1", // Light text for input
		errorText: "#EF9A9A", // Soft red for error messages
		buttonBackground: "#546E7A", // Dark blue for buttons
		buttonHoverBackground: "#78909C", // Hover effect for buttons
	},
};
