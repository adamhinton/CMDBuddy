"use client";
// Not sure I've done this right.
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure(config);

Authenticator;
const Login = () => {
	return (
		<>
			<h1>Log In</h1>
			<Authenticator>
				{({ signOut, user }) => (
					<div>
						<h1>Adam Hinton</h1>
						<button onClick={signOut}>Sign Out</button>
					</div>
				)}
			</Authenticator>
		</>
	);
};

export default Login;
