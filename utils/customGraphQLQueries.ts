import { graphqlOperation, API } from "aws-amplify";

import { GraphQLResult } from "@aws-amplify/api";
import { CMDBuddyCommand } from "./zod/CommandSchema";
import { CMDBuddyUser } from "./zod/UserSchema";

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
						minLength
						maxLength
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

export const customUserByEmail = /* GraphQL */ `
	query UserByEmail($email: String!) {
		userByEmail(email: $email) {
			items {
				id
				email
				darkMode
				commands {
					items {
						id
						baseCommand
						title
						order
						parameters {
							items {
								id
								type
								defaultValue
								name
								order
								validationRegex
								minLength
								maxLength
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
			nextToken
		}
	}
`;

export const customGetCommandWithParameters = /* GraphQL */ `
	query GetCommandWithParameters($id: ID!) {
		getCommand(id: $id) {
			id
			baseCommand
			title
			order
			userID
			user {
				id
				email
				darkMode
				createdAt
				updatedAt
				__typename
			}
			parameters {
				items {
					commandID
					id
					type
					defaultValue
					name
					order
					validationRegex
					minLength
					maxLength
					minValue
					maxValue
					isNullable
					allowedValues
					__typename
				}
				nextToken
			}
			createdAt
			updatedAt
			__typename
		}
	}
`;

export const getSortedCommandsAndParameters = async (
	fetchBy: "email" | "userID",
	identifier: string
): Promise<CMDBuddyUser> => {
	// NOTE: The user in question is data.userByEmail.items[0]
	// The user's Commands is data.userByEmail.items[0].commands
	// The GraphQL response has some funny formats like that so we mutate it a bit below.

	// Fetch data using the appropriate query
	const userFromDB: any =
		fetchBy === "email"
			? await API.graphql(
					graphqlOperation(customUserByEmail, {
						email: identifier,
					})
			  )
			: await API.graphql(
					graphqlOperation(customCommandsAndParametersByUserID, {
						id: identifier,
					})
			  );

	// Mutating the db response to look like we want
	const loggedInUser: CMDBuddyUser = {
		id: userFromDB.data.userByEmail.items[0].id,
		email_verified: true,
		email: userFromDB.data.userByEmail.items[0].email,
		darkMode: userFromDB.data.userByEmail.items[0].darkMode,
		commands: userFromDB.data.userByEmail.items[0].commands.items,
	};

	// The graphQL response returns parameters as `items`, but we just want an array so we mutate like so.
	loggedInUser.commands?.forEach((cmd, index, array) => {
		const incorrectlyFormattedParameters = cmd.parameters;
		// @ts-ignore
		cmd.parameters = incorrectlyFormattedParameters.items;
	});

	// Now to sort Commands by their `order` property
	// if they have the same order that's fine, they'll just appear in the order they came from the db
	loggedInUser.commands?.sort(
		(a: CMDBuddyCommand, b: CMDBuddyCommand) => a.order - b.order
	);

	// Now sort Parameters by Order as well.
	// if they have the same order that's fine, they'll just appear in the order they came from the db
	loggedInUser.commands?.forEach((command: CMDBuddyCommand) => {
		if (command.parameters) {
			command.parameters.sort((a, b) => a.order - b.order);
		}
	});

	return loggedInUser;
};
