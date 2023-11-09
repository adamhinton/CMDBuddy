"use client";
import { DefaultTheme, ThemeProvider } from "styled-components";

// The props should be passed as a single object and destructured within the function parameter list
const ThemeProviderWrapper = ({
	theme,
	children,
}: {
	theme: DefaultTheme;
	children: React.ReactNode;
}) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
