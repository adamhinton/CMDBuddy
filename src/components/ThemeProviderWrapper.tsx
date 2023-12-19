"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../utils/styles/themes";

// The props should be passed as a single object and destructured within the function parameter list
const ThemeProviderWrapper = ({
	// theme,
	children,
}: {
	// theme: DefaultTheme;
	children: React.ReactNode;
}) => {
	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);
	console.log("isDarkMode TPR:", isDarkMode);
	const [theme, setTheme] = useState(darkTheme);

	useEffect(() => {
		setTheme(isDarkMode ? darkTheme : lightTheme);
	}, [isDarkMode]);

	console.log("theme:", theme);
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
