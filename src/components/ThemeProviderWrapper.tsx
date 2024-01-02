"use client";
// README:
// This component wraps around the app and passes in theming (lightMode and darkMode)

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../utils/styles/themes";

// The props should be passed as a single object and destructured within the function parameter list
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);
	const [theme, setTheme] = useState(darkTheme);

	useEffect(() => {
		setTheme(isDarkMode ? darkTheme : lightTheme);
	}, [isDarkMode]);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
