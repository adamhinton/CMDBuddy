// README:
// The problem this function seeks to solve is that when a user signs up in the app, that adds the user to Cognito, but doesn't add their record to the db
// So Cognito updates trigger this lambda function, which adds the user in question to the db
// IMPORTANT: Cognito adds the user *after* this lambda function runs, and only *if* it returns valid JSON without throwing an error.
// -- So, we *log* errors here, rather than throwing errors.

// TODO Stretch: Extend cognito first stuff to other CRUD ops

// TODO Stretch: Reinstate DB-first triggers to add Cognito users
// -- Note that it needs to return valid JSON. This is easy, just return the event like in the function below.

const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	const GRAPHQL_ENDPOINT =
		process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT;
	const GRAPHQL_API_KEY = process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT;

	const userEmail = event.request.userAttributes.email;

	// Check if user already exists in DynamoDB
	const userExists = await checkIfUserExistsInDynamoDB(
		userEmail,
		GRAPHQL_ENDPOINT,
		GRAPHQL_API_KEY
	);
	if (userExists) {
		console.log("User already exists in DynamoDB:", userEmail);
		// Ensure to return the event object for Cognito to proceed
		return event;
	}

	const mutation = /* GraphQL */ `
		mutation CREATE_USER($input: CreateUserInput!) {
			createUser(input: $input) {
				email
				darkMode
			}
		}
	`;

	const variables = {
		input: {
			email: userEmail,
			darkMode: true,
		},
	};

	const options = {
		method: "POST",
		headers: {
			"x-api-key": GRAPHQL_API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query: mutation, variables }),
	};

	try {
		const res = await fetch(GRAPHQL_ENDPOINT, options);
		const response = await res.json();
		if (response.errors) {
			console.error("Error creating user in DynamoDB:", response.errors);
		} else {
			console.log("User created in DynamoDB:", userEmail);
		}
	} catch (error) {
		console.error("Error processing event:", error);
		// Consider how you want to handle errors. Throwing errors here will affect Cognito.
	}

	// Ensure to return the event object for Cognito to proceed
	return event;
};

async function checkIfUserExistsInDynamoDB(email, endpoint, apiKey) {
	const query = /* GraphQL */ `
		query UserByEmail($email: String!) {
			userByEmail(email: $email) {
				items {
					email
				}
			}
		}
	`;

	const variables = { email };

	const options = {
		method: "POST",
		headers: {
			"x-api-key": apiKey,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	};

	try {
		const res = await fetch(endpoint, options);
		const response = await res.json();
		return (
			response.data &&
			response.data.userByEmail &&
			response.data.userByEmail.items.length > 0
		);
	} catch (error) {
		console.error("Error checking user in DynamoDB:", error);
		throw error;
	}
}
