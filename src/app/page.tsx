// prettier-ignore
// "use client";

import { Amplify } from "aws-amplify";
import Link from "next/link";

// Not sure I've done this right.
//https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration

import config from "../aws-exports";

function Home() {
	return (
		<main>
			<h1>Main page</h1>
			<Link href="/login">Login</Link>
			<Link href="/commands">Commands</Link>
		</main>
	);
}

export default Home;
