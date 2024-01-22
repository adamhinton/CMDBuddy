"use client";

// README:
// This main page doesn't do anything. If user is logged in it redirects to /commands ; if not logged in, redirects to /about.

import { Amplify } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure({ ...config, ssr: true });
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

// Not sure I've done this right.
//https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration

function Home() {
	const isLoggedIn = useSelector((state: RootState) => {
		return state.auth.user ? true : false;
	});

	const router = useRouter();

	// This page does nothing; only redirects on load
	useEffect(() => {
		router.push(isLoggedIn ? "/commands" : "/about");
	});

	// User should never actually reach this
	return <h1>CMDBuddy</h1>;
}

export default Home;
