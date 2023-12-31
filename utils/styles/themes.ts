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
		background: "#E0F7FA",
		text: "#0D47A1",
		link: "#004D40",
		toggleIcon: "#FFCA28",
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
	login: {
		buttonBackground: "#B3E5FC",
		buttonText: "#0D47A1",
		buttonHoverBackground: "#81D4FA",
		inputBackground: "#FFFFFF",
		inputText: "#333333",
		inputPlaceholderText: "#8A9AA4",
		inputBorder: "#B0BEC5",
		inputFocusBorder: "#0D47A1",
		errorText: "#D32F2F",
		tabText: "#004D40",
		tabActiveText: "#0D47A1",
		tabInactiveBackground: "#E0F7FA",
		tabActiveBackground: "#FFFFFF",
		formBackground: "#E3F2FD",
		linkText: "#004D40",
		linkHoverText: "#00796B",
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
	login: {
		buttonBackground: "#546E7A",
		buttonText: "#ECEFF1",
		buttonHoverBackground: "#78909C",
		inputBackground: "#455A64",
		inputText: "#ECEFF1",
		inputPlaceholderText: "#90A4AE",
		inputBorder: "#78909C",
		inputFocusBorder: "#80CBC4",
		errorText: "#EF9A9A",
		tabText: "#80CBC4",
		tabActiveText: "#ECEFF1",
		tabInactiveBackground: "#37474F",
		tabActiveBackground: "#263238",
		formBackground: "#37474F",
		linkText: "#80CBC4",
		linkHoverText: "#A7FFEB",
	},
};
