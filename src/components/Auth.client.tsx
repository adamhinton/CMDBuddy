"use client";

// README:
// This component has NO UI ELEMENTS
// This is purely an Auth component
// That is to say, on page load, it checks to see if a user is already logged in, and if so, sets that user's data to global state
// It also sets darkMode pref to state; if a user isn't logged in, it checks localStorage and device darkMode preference

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";
import { useAuthActions } from "../../utils/authUtils";
import { useDispatch } from "react-redux";
import { setIsDarkMode } from "../../redux/slices/darkModeSlice";
import { getUserDarkModePreference } from "../../utils/darkModeUtils";
import { useRouter } from "next/navigation";

Amplify.configure({ config, ssr: true });
Auth.configure({ config, ssr: true });

// TODO: These two cognito types are defined in two spots; merge them and export them.
interface CognitoLoggedInUserAttributes {
	sub: string;
	email_verified: boolean;
	email: string;
	data: [any];
}

interface CognitoLoggedInUser {
	storage: any;
	attributes: CognitoLoggedInUserAttributes;
}

const getMyUser = async (): Promise<CognitoLoggedInUser | null> => {
	try {
		const cognitoLoggedInUser = await Auth.currentAuthenticatedUser();
		return cognitoLoggedInUser;
	} catch (error) {
		console.error("Error fetching Cognito user:", error);
		return null;
	}
};

export default function AuthClientComponent(): null {
	const router = useRouter();

	const dispatch = useDispatch();

	const [cognitoLoggedInUser, setCognitoLoggedInUser] =
		useState<CognitoLoggedInUser | null>(null);
	const { setUserAndCommandsToState } = useAuthActions();

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setCognitoLoggedInUser(initUser);
			// If user is logged in on page load, redirect to /commands.
			// Else, redirect to login
			if (initUser) {
				router.push("/commands");
			} else {
				router.push("/login");
			}
		};
		fetchData();
	}, [router]);

	useEffect(() => {
		const updateState = async () => {
			if (cognitoLoggedInUser !== null) {
				try {
					await setUserAndCommandsToState(cognitoLoggedInUser);
				} catch (error) {
					console.error("Error setting user and commands to state:", error);
				}
			} else {
				const darkModePreference = getUserDarkModePreference();
				dispatch(setIsDarkMode(darkModePreference));
			}
		};
		updateState();
	}, [cognitoLoggedInUser, dispatch, setUserAndCommandsToState]);

	return null;
}
