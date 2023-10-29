"use client";
// Not sure I've done this right.
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../../src/aws-exports";
Amplify.configure({ ...config, ssr: true });

Authenticator;
const Login = () => {
	const currentUser = useSelector((state: RootState) => state.auth.user);

	return (
		<>
			<h1>Log In</h1>
			<Authenticator>
				{({ signOut, user }) => {
					console.log("user:", user);
					return (
						<div>
							<button onClick={signOut}>Sign Out</button>
						</div>
					);
				}}
			</Authenticator>
		</>
	);
};

export default Login;
