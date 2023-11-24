/* Amplify Params - DO NOT EDIT
	API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIIDOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

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
	console.log("GRAPHQL_ENDPOINT:", GRAPHQL_ENDPOINT);
	console.log("GRAPHQL_API_KEY:", GRAPHQL_API_KEY);

	const query = /* GraphQL */ `
		mutation CREATE_USER($input: CreateUserInput!) {
			createUser(input: $input) {
				email
				darkMode
			}
		}
	`;

	const variables = {
		input: {
			email: event.request.userAttributes.email,
			darkMode: true,
		},
	};

	const options = {
		method: "POST",
		headers: {
			"x-api-key": GRAPHQL_API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	};

	const response = {};

	try {
		const res = await fetch(GRAPHQL_ENDPOINT, options);
		response.data = await res.json();
		if (response.data.errors) response.statusCode = 400;
	} catch (error) {
		response.statusCode = 400;
		response.body = {
			errors: [
				{
					message: error.message,
					stack: error.stack,
				},
			],
		};
	}

	context.done(null, event);
	console.log("This should trigger after context.done");

	return {
		...response,
		body: JSON.stringify(response.body),
	};
};
