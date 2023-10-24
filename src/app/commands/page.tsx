"use client";
import { commandsByUserID, parametersByCommandID } from "@/graphql/queries";
import { API, Amplify, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import config from "../../aws-exports";
Amplify.configure(config);

// Gets Commands by userID along with Commands' Parameters
const customCommandsAndParametersByUserID = /* GraphQL */ `
	query CommandsByUserID($userID: ID!) {
		commandsByUserID(userID: $userID) {
			items {
				id
				baseCommand
				title
				order
				userID
				parameters {
					items {
						id
						type
						defaultValue
						name
						order
						validationRegex
						length
						minValue
						maxValue
						isNullable
						allowedValues
					}
					nextToken
				}
			}
			nextToken
		}
	}
`;

const Commands = () => {
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub;
				const result = await API.graphql(
					graphqlOperation(customCommandsAndParametersByUserID, {
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
