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

Amplify.configure({ ...config });
Auth.configure(config);

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
		<>
			<h1>Log In</h1>
			<Link href="/commands">Commands</Link>
			<Authenticator>
				{({ signOut, user }) => {
					if (user && !currentUser) {
						handleLogin(user);
					}
					return (
						<div>
							{currentUser ? (
								<>
									<button onClick={() => handleSignOut(signOut)}>
										Sign Out
									</button>
									<button onClick={toggleChangePassword}>
										Change Password
									</button>
									{/* Clicking this doesn't immediately delete account, just pulls up the UI to do so */}
									<button onClick={toggleDeleteAccount}>Delete Account</button>
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
			</Authenticator>
		</>
	);
};

export default Login;
