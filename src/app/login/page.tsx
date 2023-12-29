"use client";
import { Authenticator, AccountSettings } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
import Link from "next/link";
import { useAuthActions } from "../../../utils/authUtils";
import { useRouter } from "next/navigation";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUser as deleteUserMutation } from "@/graphql/mutations";
import styled from "styled-components";

Amplify.configure({ ...config, ssr: true });

// Styled wrapper for the whole page to ensure it takes the theme colors
const StyledLoginWrapper = styled.div`
	color: ${({ theme }) => theme.colors.text};
	background-color: ${({ theme }) => theme.colors.background};
	padding: 20px;
	border-radius: 5px;
	max-width: 500px;
	margin: 50px auto;
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

// Styled Authenticator component to override default styles
const StyledAuthenticator = styled(Authenticator)`
	/* General container styles */
	--amplify-colors-background-primary: ${({ theme }) =>
		theme.colors.background};
	--amplify-colors-font-primary: ${({ theme }) => theme.colors.text};

	/* Button styles */
	--amplify-colors-brand-primary-80: ${({ theme }) =>
		theme.login.buttonHoverBackground};
	--amplify-colors-brand-primary-60: ${({ theme }) =>
		theme.login.buttonBackground};
	--amplify-colors-font-inverse: ${({ theme }) => theme.login.buttonText};

	/* Input styles */
	--amplify-components-fieldcontrol-border-color: ${({ theme }) =>
		theme.login.inputBorder};
	--amplify-colors-font-secondary: ${({ theme }) => theme.login.inputText};
	--amplify-components-fieldcontrol-placeholder-color: ${({ theme }) =>
		theme.login.inputPlaceholderText};

	/* Tab and link styles */
	--amplify-colors-brand-secondary-80: ${({ theme }) =>
		theme.login.tabActiveBackground};
	--amplify-colors-font-tertiary: ${({ theme }) => theme.login.tabText};
	--amplify-colors-font-interactive: ${({ theme }) => theme.login.linkText};
	--amplify-colors-font-interactive-hover: ${({ theme }) =>
		theme.login.linkHoverText};

	/* Error text styles */
	--amplify-colors-feedback-error: ${({ theme }) => theme.login.errorText};

	/* Override specific component styles */
	.amplify-button {
		background-color: ${({ theme }) => theme.login.buttonBackground} !important;
		color: ${({ theme }) => theme.login.buttonText} !important;
	}

	.amplify-input {
		background-color: ${({ theme }) => theme.login.inputBackground} !important;
		color: ${({ theme }) => theme.login.inputText} !important;
		border-color: ${({ theme }) => theme.login.inputBorder} !important;
	}

	.amplify-tabs-item[data-state="active"] {
		background-color: ${({ theme }) =>
			theme.login.tabActiveBackground} !important;
		color: ${({ theme }) => theme.login.tabActiveText} !important;
	}

	.amplify-tabs-item:not([data-state="active"]) {
		background-color: ${({ theme }) =>
			theme.login.tabInactiveBackground} !important;
		color: ${({ theme }) => theme.login.tabText} !important;
	}

	.amplify-label {
		color: ${({ theme }) => theme.login.inputText} !important;
	}

	.amplify-field-group__outer-end {
		.amplify-button {
			color: ${({ theme }) => theme.login.inputText} !important;
		}
	}

	/* Add more overrides based on the components you want to style */
`;

const Login = () => {
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const { setUserAndCommandsToState, logOut } = useAuthActions();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			const amplifyUser = await Auth.currentAuthenticatedUser().catch(
				() => null
			);
			if (!amplifyUser && currentUser) {
				logOut();
			}
		};
		checkUser();
	}, [currentUser, logOut]);

	const handleLogin = async (user: any) => {
		if (user) {
			await setUserAndCommandsToState(user);
			router.push("/commands");
		}
	};

	const handleSignOut = async (signOut?: any) => {
		try {
			if (signOut) {
				await signOut();
			}
			logOut();
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	const handleSuccess = () => {
		router.push("/commands");
	};

	const toggleChangePassword = () => {
		setShowChangePassword(true);
		setShowDeleteAccount(false);
	};

	const toggleDeleteAccount = () => {
		setShowDeleteAccount(true);
		setShowChangePassword(false);
	};

	const handleDeleteAccount = async () => {
		try {
			if (currentUser && currentUser.id) {
				await API.graphql(
					graphqlOperation(deleteUserMutation, {
						input: { id: currentUser.id },
					})
				);
			}
			logOut();
			router.push("/");
		} catch (error) {
			console.error("Error deleting user from database: ", error);
		}
	};

	return (
		<StyledLoginWrapper>
			<StyledHeader>Log In</StyledHeader>
			<StyledAuthenticator>
				{({ signOut, user }) => {
					if (user && !currentUser) {
						handleLogin(user);
					}
					return (
						<div>
							{currentUser ? (
								<>
									<StyledButton onClick={() => handleSignOut(signOut)}>
										Sign Out
									</StyledButton>
									<StyledButton onClick={toggleChangePassword}>
										Change Password
									</StyledButton>
									{/* Clicking this doesn't immediately delete account, just pulls up the UI to do so */}
									<StyledButton onClick={toggleDeleteAccount}>
										Delete Account
									</StyledButton>
									{showChangePassword && (
										<AccountSettings.ChangePassword onSuccess={handleSuccess} />
									)}
									{showDeleteAccount && (
										<AccountSettings.DeleteUser
											onSuccess={handleDeleteAccount}
										/>
									)}
								</>
							) : (
								"Please sign in"
							)}
						</div>
					);
				}}
			</StyledAuthenticator>
		</StyledLoginWrapper>
	);
};

export default Login;
