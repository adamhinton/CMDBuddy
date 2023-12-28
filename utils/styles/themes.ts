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
	commandGeneration: {
		baseBackground: "#f0f0f0",
		baseText: "#333",
		inputBackground: "#fff",
		inputText: "#333",
		buttonBackground: "#e0e0e0",
		buttonHoverBackground: "#d0d0d0",
		buttonActiveBackground: "#c0c0c0",
		selectBackground: "#fff",
		selectText: "#333",
		inputBorderColor: "#ccc",
		inputHoverBorderColor: "#bbb",
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
		background: "#263238",
		text: "#ECEFF1",
		link: "#80CBC4",
		toggleIcon: "#FFEB3B",
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
		formBackground: "#37474F",
		formText: "#ECEFF1",
		inputBackground: "#455A64",
		inputText: "#ECEFF1",
		errorText: "#EF9A9A",
		buttonBackground: "#546E7A",
		buttonHoverBackground: "#78909C",
	},
	commandGeneration: {
		baseBackground: "#222",
		baseText: "#f5f5f5",
		inputBackground: "#333",
		inputText: "#f5f5f5",
		buttonBackground: "#444",
		buttonHoverBackground: "#555",
		buttonActiveBackground: "#666",
		selectBackground: "#333",
		selectText: "#f5f5f5",
		inputBorderColor: "#ccc",
		inputHoverBorderColor: "#bbb",
	},
};
