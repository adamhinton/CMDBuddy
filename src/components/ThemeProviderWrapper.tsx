"use client";
// README:
// This component wraps around the app and passes in theming (lightMode and darkMode)

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../utils/styles/themes";

export const GlobalStyles = createGlobalStyle`
*{
	max-width: 100%;
	box-sizing: border-box;
}
  body {
	color: red;
    transition: background-color 0.3s linear, color 0.3s linear;
  }
  // Add other global styles here if necessary
`;

// The props should be passed as a single object and destructured within the function parameter list
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
			<GlobalStyles />
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

export default ThemeProviderWrapper;
