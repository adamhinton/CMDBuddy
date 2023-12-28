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
const StyledAuthenticator = styled(Authenticator)``;

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
