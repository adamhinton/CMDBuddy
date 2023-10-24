// prettier-ignore
// "use client";

// Not sure I've done this right.
//https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration

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
