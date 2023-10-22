// prettier-ignore
"use client";
import { Amplify } from "aws-amplify";
import config from "../aws-exports"; // adjust the path as needed
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
//https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration

Amplify.configure(config);

function Home() {
	return (
		<main>
			<h1>Adam Hinton</h1>
		</main>
	);
}

// export default withAuthenticator(Home);
export default Home;

{
	/* <Authenticator>
	{({ signOut, user }) => (
		<div>
			<h1>Adam Hinton</h1>
			<button onClick={signOut}>Sign Out</button>
		</div>
	)}
</Authenticator>; */
}
