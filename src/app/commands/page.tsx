"use client";
import { commandsByUserID, parametersByCommandID } from "@/graphql/queries";
import { API, Amplify, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Adjust the import path as needed
import config from "../../aws-exports";
Amplify.configure(config);

// TODO: Move this function somewhere else
// Gets Commands by userID along with Commands' Parameters
export const customCommandsAndParametersByUserID = /* GraphQL */ `
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
	const currentUser = useSelector((state: RootState) => {
		return state.auth.user;
	});
	console.log("currentUser in commands:", currentUser);
	const commands = currentUser?.data.commandsByUserID.items;
	console.log("commands:", commands);

	return <h1>Commands Placeholder</h1>;
};

export default Commands;
