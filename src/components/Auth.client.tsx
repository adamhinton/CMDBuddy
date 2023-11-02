"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "@/app/commands/page";
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";
import { CMDBuddyUser } from "../../utils/zod/UserSchema";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";
import { setCommands } from "../../redux/slices/commandsSlice";

Amplify.configure({ config, ssr: true });

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
	const cognitoLoggedInUser = await Auth.currentAuthenticatedUser();
	return cognitoLoggedInUser;
};
export default function AuthClientComponent(): any {
	// This gets the Cognito logged in user (if there is one) in the first useEffect.
	// But that returns a big, unwieldy object with unnecessary info.
	// So then, the second useEffect calls to the API to get the user's Commands and returns a custom object with only the info we need for a user.
	const dispatch = useDispatch();
	const [cognitoLoggedInUser, setcognitoLoggedInUser] =
		useState<CognitoLoggedInUser | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setcognitoLoggedInUser(initUser);
		};
		fetchData();
	}, [dispatch]);

	useEffect(() => {
		const fetchData = async () => {
			if (cognitoLoggedInUser?.attributes?.sub) {
				const userId = cognitoLoggedInUser.attributes.sub;
				console.log("cognitoLoggedInUser:", cognitoLoggedInUser);
				// TODO: Better typing for this
				const result: any = await API.graphql(
					graphqlOperation(customCommandsAndParametersByUserID, {
						userID: userId,
					})
				);

				// This is the object we're actually setting to redux state
				const loggedInUser: CMDBuddyUser = {
					id: cognitoLoggedInUser.attributes.sub,
					email_verified: cognitoLoggedInUser.attributes.email_verified,
					email: cognitoLoggedInUser.attributes.email,
					commands: result.data.commandsByUserID.items,
					darkMode: cognitoLoggedInUser.storage.store.isDarkMode,
				};
				dispatch(setUser(loggedInUser));

				const userCommands: CMDBuddyCommand[] =
					result.data.commandsByUserID.items;
				dispatch(setCommands(userCommands));

				console.log("loggedInUser:", loggedInUser);
				console.log("userCommands in auth.slice:", userCommands);
			}
		};
		fetchData();
	}, [
		dispatch,
		cognitoLoggedInUser?.attributes,
		cognitoLoggedInUser?.storage,
		cognitoLoggedInUser,
	]);
	return <h1>Test auth.client</h1>;
}
