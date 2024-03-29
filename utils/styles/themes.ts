// README:
// Pretty straightforward. Contains lightTheme and darkTheme which are passed in to our styled-components
// These themes have the same properties, just with different color values.

import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
	global: {
		backgroundColor: "#F4F8FA",
		textColor: "#5A5A5A",
	},

	colors: {
		background: "#e0f7fa",
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
		collapsibleBarBackground: "#f0f0f0",
		collapsibleBarHoverBackground: "#e0e0e0",
		PCEFBackground: "#ffffff",
		PCEFColor: "333333",
		PCEFBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		// Submit button stuff:
		submitButtonBackground: "#3272D9",
		submitButtonText: "#FFFFFF",
		submitButtonBorder: "#2860B2",
		submitButtonHoverBackground: "#1D4A8C",
		submitButtonHoverText: "#FFFFFF",
		submitButtonDisabledBackground: "#A6B1C2",
		submitButtonDisabledText: "#E1E4E8",
		submitButtonDisabledBorder: "#A6B1C2",
		// Dropdown input stuff in PCEF
		dropdownBackgroundColor: "#FFFFFF",
		dropdownBorderColor: "#D1D5DB",
		dropdownTextColor: "#111827",
		dropdownTagBackgroundColor: "#E5E7EB",
		dropdownTagTextColor: "#374151",
		dropdownTagRemoveIconColor: "#9CA3AF",
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
		errorBackground: "#FFF3F3",
		errorItemBackground: "#FFEDED",
		errorBorderLeftColor: "#FF5C5C",
	},

	// Shared styling between LiveCommandCreationPreview and LiveCommandExecution preview because they do much the same thing
	commandPreview: {
		background: "#f7f7f7",
		text: "#333333",
		boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
		buttonBackground: "#a3cef1",
		buttonText: "#ffffff",
		buttonHoverBackground: "#7fb2e5",
		focusShadow: "0 0 0 2px #a3cef1",
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

	aboutPage: {
		title: "#0D47A1",
		subtitle: "#004D40",
		text: "#333333",
		codeBlock: "#E8F5E9",
		codeText: "#1B5E20",
		tocBackground: "#E0F2F1",
		tocText: "#00695C",
		subSubtitle: "#006064",
		imageBorder: "#B2EBF2",
		imageBackground: "#E0F7FA",
		toCSubHeading: "#78909C",
		borderColor: "black",
	},
};

export const darkTheme: DefaultTheme = {
	global: {
		backgroundColor: "#2B3A42",
		textColor: "#C0C2B8",
	},

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
		collapsibleBarBackground: "#3a3b3c",
		collapsibleBarHoverBackground: "#4a4b4c",
		PCEFBackground: "#1e1e1e",
		PCEFColor: "#ffffff",
		PCEFBoxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
		// Submit button stuff:
		submitButtonBackground: "#4A90E2",
		submitButtonText: "#FFFFFF",
		submitButtonBorder: "#3178C6",
		submitButtonHoverBackground: "#357ABD",
		submitButtonHoverText: "#FFFFFF",
		submitButtonDisabledBackground: "#5F7C8A",
		submitButtonDisabledText: "#C7D0D9",
		submitButtonDisabledBorder: "#5F7C8A",
		// Dropdown input stuff in PCEF
		dropdownBackgroundColor: "#111827",
		dropdownBorderColor: "#374151",
		dropdownTextColor: "#F9FAFB",
		dropdownTagBackgroundColor: "#1F2937",
		dropdownTagTextColor: "#F9FAFB",
		dropdownTagRemoveIconColor: "#6B7280",
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
		errorBackground: "#2A2A2A",
		errorItemBackground: "333333",
		errorBorderLeftColor: "#E57373",
	},

	// Shared styling between LiveCommandCreationPreview and LiveCommandExecution preview because they do much the same thing
	commandPreview: {
		background: "#2c3e50",
		text: "#ecf0f1",
		buttonBackground: "#5c7f94",
		buttonText: "#ecf0f1",
		boxShadow: "0 2px 5px rgba(255, 255, 255, 0.1)",
		buttonHoverBackground: "#3c6e71",
		focusShadow: "0 0 0 2px #5c7f94",
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

	aboutPage: {
		title: "#80CBC4",
		subtitle: "#4DB6AC",
		text: "#ECEFF1",
		codeBlock: "#263238",
		codeText: "#B2DFDB",
		tocBackground: "#37474F",
		tocText: "#80CBC4",
		subSubtitle: "#80CBC4",
		imageBorder: "#26A69A",
		imageBackground: "#004D40",
		tOCSubHeading: "#B0BEC5",
		borderColor: "white",
	},
};
