// prettier-ignore
// "use client";

import { Amplify } from "aws-amplify";

// Not sure I've done this right.
//https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration

import config from "../aws-exports";
// Amplify.configure({ config, ssr: true });

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
