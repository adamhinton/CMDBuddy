"use client";

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";
import { useAuthActions } from "../../utils/authUtils";

Amplify.configure({ config, ssr: true });

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
	const [cognitoLoggedInUser, setCognitoLoggedInUser] =
		useState<CognitoLoggedInUser | null>(null);
	const { setUserAndCommandsToState } = useAuthActions();

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setCognitoLoggedInUser(initUser);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const updateState = async () => {
			if (cognitoLoggedInUser) {
				try {
					await setUserAndCommandsToState(cognitoLoggedInUser);
				} catch (error) {
					console.error("Error setting user and commands to state:", error);
				}
			}
		};
		updateState();
	}, [cognitoLoggedInUser, setUserAndCommandsToState]);

	return null;
}
