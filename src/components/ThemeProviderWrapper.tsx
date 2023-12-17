"use client";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { darkTheme, lightTheme } from "../../utils/styles/themes";
import { useEffect, useState } from "react";

// The props should be passed as a single object and destructured within the function parameter list
const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
	const isDarkMode: boolean = useSelector((state: RootState) => {
		return state.darkMode.isDarkMode;
	});

	const theme = isDarkMode ? darkTheme : lightTheme;

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
