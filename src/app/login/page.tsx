"use client";
// Not sure I've done this right.
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import { useDispatch } from "react-redux";
import { logOutCommands } from "../../../redux/slices/commandsSlice";
import { logOutUser } from "../../../redux/slices/authSlice";

Authenticator;
const Login = () => {
	const currentUser = useSelector((state: RootState) => state.auth.user);

	const dispatch = useDispatch();

	const handleSignOut = async (
		signOut: ((data?: Object | undefined) => void) | undefined
	) => {
		try {
			signOut && signOut();
			dispatch(logOutCommands());
			dispatch(logOutUser());
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
					console.log("user:", user);
					return (
						<div>
							<button onClick={() => handleSignOut(signOut)}>Sign Out</button>
						</div>
					);
				}}
			</Authenticator>
		</>
	);
};

export default Login;
