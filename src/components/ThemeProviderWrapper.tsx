"use client";
// README:
// This component wraps around the app and passes in theming (lightMode and darkMode)
// Also contains global styles

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	DefaultTheme,
	ThemeProvider,
	createGlobalStyle,
} from "styled-components";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../utils/styles/themes";

// I feel like there's a better way to pass in theme to GlobalStyles
const GlobalStylesContainer = (theme: DefaultTheme) => {
	const GlobalStyles = createGlobalStyle`
*{
	max-width: 100%;
	box-sizing: border-box;
}
  body {
	color: ${theme.theme.global.textColor};
	background-color: ${theme.theme.global.backgroundColor};
    transition: background-color 0.3s linear, color 0.3s linear;
  }
`;

	return (
		<>
			<GlobalStyles />
		</>
	);
};

/**The UI is wrapped in this so dark/light mode stuff can be passed down */
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);
	const [theme, setTheme] = useState(darkTheme);

	useEffect(() => {
		setTheme(isDarkMode ? darkTheme : lightTheme);
	}, [isDarkMode]);
	return (
		<>
			<GlobalStylesContainer theme={theme} />
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

export default ThemeProviderWrapper;
