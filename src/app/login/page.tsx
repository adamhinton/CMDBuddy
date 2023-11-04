"use client";
// Not sure I've done this right.
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import { useAuthActions } from "../../../utils/authUtils";
import { useEffect } from "react";

const Login = () => {
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const { setUserAndCommandsToState, logOut } = useAuthActions();

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
		}
	};

	//TODO: Fix this any type
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
								<button onClick={() => handleSignOut(signOut)}>Sign Out</button>
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
