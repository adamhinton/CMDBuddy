"use client";
import { Authenticator, AccountSettings } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
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

// Styled Authenticator component to override default styles in Amplify's built in component
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

	// Overrides for specific components
	// Add other overrides as needed
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
			<StyledHeader>Account Management</StyledHeader>
			{!currentUser && (
				<StyledLoginExplain>
					Make an account to generate CLI commands!
				</StyledLoginExplain>
			)}
			<StyledAuthenticator>
				{({ signOut, user }) => {
					if (user && !currentUser) {
						handleLogin(user);
					}
					return (
						<StyledAccountManagementContainer>
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
						</StyledAccountManagementContainer>
					);
				}}
			</StyledAuthenticator>
		</StyledLoginWrapper>
	);
};

export default Login;
