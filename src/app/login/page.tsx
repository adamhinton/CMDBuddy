"use client";
import { AccountSettings } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
import { useAuthActions } from "../../../utils/authUtils";
import { useRouter } from "next/navigation";
import { API, graphqlOperation } from "aws-amplify";
import { deleteUser as deleteUserMutation } from "@/graphql/mutations";
import LoginStyles from "../../../utils/styles/LoginStyles";

Amplify.configure({ ...config, ssr: true });

const {
	StyledLoginWrapper,
	StyledHeader,
	StyledLoginExplain,
	StyledAuthenticator,
	StyledAccountManagementContainer,
	StyledButton,
} = LoginStyles;

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
				logOut(router);
			}
		};
		checkUser();
	}, [currentUser, logOut, router]);

	const handleLogin = async (user: any) => {
		if (user) {
			await setUserAndCommandsToState(user);
			router.push("/commands/generate");
		}
	};

	const handleSignOut = async (signOut?: any) => {
		try {
			if (signOut) {
				await signOut();
			}
			logOut(router);
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	const handleSuccess = () => {
		router.push("/commands/generate");
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
			logOut(router);
			router.push("login");
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
