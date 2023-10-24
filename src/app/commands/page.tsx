"use client";
import { commandsByUserID, parametersByCommandID } from "@/graphql/queries";
import { API, Amplify, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import config from "../../aws-exports";
Amplify.configure(config);

const Commands = () => {
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub;
				console.log("userId:", userId);
				const result = await API.graphql(
					graphqlOperation(commandsByUserID, {
						userID: userId,
					})
				);
				console.log("result:", result);
			} catch (error) {
				console.log("Not authenticated");
			}
		};

		fetchUser();
	}, []);

	return <h1>Commands Placeholder</h1>;
};

export default Commands;
