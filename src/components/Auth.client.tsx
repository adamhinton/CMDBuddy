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
import { usePathname, useRouter } from "next/navigation";
import { CognitoLoggedInUserAttributes } from "../../utils/authUtils";

Amplify.configure({ config, ssr: true });
Auth.configure({ config, ssr: true });

export interface CognitoLoggedInUser {
	storage: unknown;
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

	const [pathName] = useState(usePathname());

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setCognitoLoggedInUser(initUser);

			// There is no "/" root path; redirect user if/when they land there
			if (pathName === "/") {
				if (initUser) {
					// If user is logged in on page load, redirect to /commands.
					// Else, redirect to about page
					router.push("/commands");
				} else {
					router.push("/about");
				}
			}
		};
		fetchData();
	}, [router, pathName]);

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
