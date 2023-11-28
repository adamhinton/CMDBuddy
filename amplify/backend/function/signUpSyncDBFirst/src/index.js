/* Amplify Params - DO NOT EDIT
	API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIIDOUTPUT
	API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT
	AUTH_CMDBUDDYSERVER568927F0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const cognitoIdp = new AWS.CognitoIdentityServiceProvider({
	apiVersion: "2016-04-18",
});

const USER_POOL_ID = "us-east-1_ztX3UnqCK";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);

	for (const record of event.Records) {
		console.log("Stream record: ", JSON.stringify(record, null, 2));

		if (record.eventName == "INSERT") {
			const newUser = record.dynamodb.NewImage;

			try {
				// Check if user already exists in Cognito
				const email = newUser.email.S;
				const userExists = await checkIfUserExists(email);

				if (!userExists) {
					// Create user in Cognito
					await createUserInCognito(email);
					console.log("User created in Cognito:", email);
				} else {
					console.log("User already exists in Cognito:", email);
				}
			} catch (error) {
				console.error("Error processing event:", error);
				throw error;
			}
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify("Lambda executed successfully!"),
	};
};

async function checkIfUserExists(email) {
	const params = {
		UserPoolId: USER_POOL_ID,
		Filter: `email = "${email}"`,
	};

	const users = await cognitoIdp.listUsers(params).promise();
	return users.Users.length > 0;
}

async function createUserInCognito(email) {
	const params = {
		UserPoolId: USER_POOL_ID,
		Username: email,
		UserAttributes: [
			{
				Name: "email",
				Value: email,
			},
			{
				Name: "email_verified",
				Value: "true",
			},
		],
		// Set other attributes as required
	};

	await cognitoIdp.adminCreateUser(params).promise();
}
