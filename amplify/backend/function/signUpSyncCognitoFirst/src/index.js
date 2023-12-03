const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	const GRAPHQL_ENDPOINT =
		process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT;
	const GRAPHQL_API_KEY = process.env.API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT;

	console.log("GRAPHQL_ENDPOINT:", GRAPHQL_ENDPOINT);
	console.log("GRAPHQL_API_KEY:", GRAPHQL_API_KEY);

	const userEmail = event.request.userAttributes.email;

	// Check if user already exists in DynamoDB
	const userExists = await checkIfUserExistsInDynamoDB(
		userEmail,
		GRAPHQL_ENDPOINT,
		GRAPHQL_API_KEY
	);
	if (userExists) {
		console.log("User already exists in DynamoDB:", userEmail);
		return;
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
			throw new Error("Error creating user in DynamoDB");
		}
		console.log("User created in DynamoDB:", userEmail);
	} catch (error) {
		console.error("Error processing event:", error);
		throw error;
	}
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
