import { graphqlOperation } from "aws-amplify";
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

const getSortedCommandsAndParameters = async (
	fetchBy: "email" | "userID",
	identifier: string
) => {
	// NOTE: The user in question is data.userByEmail.items[0]
	// The user's Commands is data.userByEmail.items[0].commands

	// Fetch data using the appropriate query
	const userFromDB: any =
		fetchBy === "email"
			? graphqlOperation(customUserByEmail, {
					email: identifier,
			  })
			: graphqlOperation(customCommandsAndParametersByUserID, {
					id: identifier,
			  });

	const loggedInUser: CMDBuddyUser = {
		id: userFromDB.data.userByEmail.items[0].id,
		email_verified: true,
		email: userFromDB.data.userByEmail.items[0].email,
		darkMode: userFromDB.data.userByEmail.items[0].darkMode,
	};

	userFromDB.userByEmail.items.commands[0].sort(
		(a: CMDBuddyCommand, b: CMDBuddyCommand) => a.order - b.order
	);

	// Sort Parameters within each Command
	userFromDB.userByEmail.items.forEach((command: CMDBuddyCommand) => {
		if (command.parameters && command.parameters.items) {
			command.parameters.items.sort((a, b) => a.order - b.order);
		}
	});

	return data;
};
