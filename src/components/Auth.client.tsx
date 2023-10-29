"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "@/app/commands/page";
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";

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

	// Second useEffect for logic depending on 'cognitoLoggedInUser'
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

				const experiment = {
					userID: cognitoLoggedInUser.attributes.sub,
					email_verified: cognitoLoggedInUser.attributes.email_verified,
					email: cognitoLoggedInUser.attributes.email,
					commands: result.data.commandsByUserID.items,
					isDarkMode: cognitoLoggedInUser.storage.store.isDarkMode,
				};
				dispatch(setUser(experiment));
				console.log("experiment:", experiment);
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
