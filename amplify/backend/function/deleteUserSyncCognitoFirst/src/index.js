/* Amplify Params - DO NOT EDIT
	API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIIDOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT
	AUTH_CMDBUDDYSERVER568927F0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	const GRAPHQL_ENDPOINT =
		process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT;
	const GRAPHQL_API_KEY = process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT;

	// Fetch user ID by email
	const queryUserByEmail = /* GraphQL */ `
		query UserByEmail($email: String!) {
			userByEmail(email: $email) {
				items {
					id
				}
			}
		}
	`;

	const email = event.request.userAttributes.email;
	const variablesUserByEmail = { email };

	const responseUserByEmail = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"x-api-key": GRAPHQL_API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: queryUserByEmail,
			variables: variablesUserByEmail,
		}),
	});

	const userData = await responseUserByEmail.json();

	if (!userData.data.userByEmail.items.length) {
		// User not found in DB, skip the delete attempt
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "User not found in DB, skipping deletion.",
			}),
		};
	}

	const userId = userData.data.userByEmail.items[0].id;

	// Delete user by ID
	const mutationDeleteUser = /* GraphQL */ `
		mutation DeleteUser($input: DeleteUserInput!) {
			deleteUser(input: $input) {
				id
			}
		}
	`;

	const variablesDeleteUser = { input: { id: userId } };

	try {
		await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"x-api-key": GRAPHQL_API_KEY,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: mutationDeleteUser,
				variables: variablesDeleteUser,
			}),
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "User successfully deleted." }),
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: "Error deleting user",
				message: error.message,
			}),
		};
	}
};
