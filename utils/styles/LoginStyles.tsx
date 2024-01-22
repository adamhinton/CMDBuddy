// README:
// Styles for Login/page.tsx

import { Authenticator } from "@aws-amplify/ui-react";
import styled from "styled-components";

// Styled wrapper for the whole page to ensure it takes the theme colors
const StyledLoginWrapper = styled.div`
	color: ${({ theme }) => theme.colors.text};
	background-color: ${({ theme }) => theme.colors.background};
	padding: 20px;
	border-radius: 5px;
	max-width: 500px;
	margin: 50px auto;
`;

// Tells user to make an account if they're not logged in
const StyledLoginExplain = styled.p`
	text-align: center;
`;

// Header for the login page
const StyledHeader = styled.h1`
	color: ${({ theme }) => theme.header.text};
	text-align: center;
	margin-bottom: 30px;
`;

// Styled button with theming
const StyledButton = styled.button`
	background-color: ${({ theme }) => theme.login.buttonBackground};
	color: ${({ theme }) => theme.login.buttonText};
	border: none;
	border-radius: 4px;
	padding: 10px 20px;
	margin-right: 10px;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.login.buttonHoverBackground};
	}
`;

const StyledAccountManagementContainer = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

// Styled Authenticator component to override default styles in Amplify's built in Auth component
// This was a huge hassle and I hope I never have to do this again
const StyledAuthenticator = styled(Authenticator)`
	--amplify-components-main-background-color: ${({ theme }) =>
		theme.colors.background};
	--amplify-components-main-text-color: ${({ theme }) => theme.colors.text};
	--amplify-components-main-border-color: ${({ theme }) =>
		theme.login.inputBorderColor};
	--amplify-colors-background-secondary: ${({ theme }) =>
		theme.login.inputBackground};
	--amplify-colors-border-primary: ${({ theme }) =>
		theme.login.inputBorderColor};
	--amplify-colors-border-secondary: ${({ theme }) =>
		theme.login.inputHoverBorderColor};
	--amplify-components-button-background-color: ${({ theme }) =>
		theme.login.buttonBackground};
	--amplify-components-button-text-color: ${({ theme }) =>
		theme.login.buttonText};
	--amplify-components-button-hover-background-color: ${({ theme }) =>
		theme.login.buttonHoverBackground};
	--amplify-components-button-hover-text-color: ${({ theme }) =>
		theme.login.buttonHoverText};
	--amplify-components-tabs-text-color: ${({ theme }) => theme.login.tabText};
	--amplify-components-tabs-active-text-color: ${({ theme }) =>
		theme.login.tabActiveText};
	--amplify-components-tabs-inactive-background-color: ${({ theme }) =>
		theme.login.tabInactiveBackground};
	--amplify-components-tabs-active-background-color: ${({ theme }) =>
		theme.login.tabActiveBackground};

	// Inputs
	.amplify-input,
	.amplify-select {
		background-color: ${({ theme }) => theme.login.inputBackground};
		color: ${({ theme }) => theme.login.inputText};
		border-color: ${({ theme }) => theme.login.inputBorderColor};
		padding: 0.5em;
		margin-bottom: 0.5em;
		&:focus {
			border-color: ${({ theme }) => theme.login.inputFocusBorderColor};
			outline: none;
		}
	}

	// Buttons
	.amplify-button {
		background-color: ${({ theme }) => theme.login.buttonBackground};
		color: ${({ theme }) => theme.login.buttonText};
		border: none;
		border-radius: 3px;
		padding: 0.6em 1.2em;
		margin: 0.3em;
		font-size: 1rem;
		&:hover {
			background-color: ${({ theme }) => theme.login.buttonHoverBackground};
			color: ${({ theme }) => theme.login.buttonHoverText};
		}
	}

	// Tab styling for Sign In and Create Account
	.amplify-tabs-item {
		background-color: ${({ theme }) => theme.login.tabInactiveBackground};
		color: ${({ theme }) => theme.login.tabText};
		&[data-state="active"] {
			background-color: ${({ theme }) => theme.login.tabActiveBackground};
			color: ${({ theme }) => theme.login.tabActiveText};
			border-bottom: 2px solid ${({ theme }) => theme.login.tabActiveBorder};
		}
	}

	// Error Text
	.amplify-field .amplify-field-message--error {
		color: ${({ theme }) => theme.login.errorText};
	}
`;

const LoginStyles = {
	StyledLoginWrapper,
	StyledHeader,
	StyledLoginExplain,
	StyledAuthenticator,
	StyledAccountManagementContainer,
	StyledButton,
};

export default LoginStyles;
