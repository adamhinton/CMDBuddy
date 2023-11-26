"use client";
import { Authenticator, AccountSettings } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
import Link from "next/link";
import { useAuthActions } from "../../../utils/authUtils";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

Amplify.configure({ ...config, ssr: true });

const Login = () => {
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const { setUserAndCommandsToState, logOut } = useAuthActions();
	// These two states are UIs that show when a user clicks the change password button or delete account button
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
									{showDeleteAccount && <AccountSettings.DeleteUser />}
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
