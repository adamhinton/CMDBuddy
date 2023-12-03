/* Amplify Params - DO NOT EDIT
    API_CMDBUDDYSERVER2_GRAPHQLAPIENDPOINTOUTPUT
    API_CMDBUDDYSERVER2_GRAPHQLAPIIDOUTPUT
    API_CMDBUDDYSERVER2_GRAPHQLAPIKEYOUTPUT
    AUTH_CMDBUDDYSERVER568927F0_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const {
	CognitoIdentityProviderClient,
	ListUsersCommand,
	AdminCreateUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
	region: process.env.REGION,
});
const USER_POOL_ID = "us-east-1_ztX3UnqCK";

exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);

	try {
		for (const record of event.Records) {
			console.log("event.Records:", event.Records);
			console.log("Stream record: ", JSON.stringify(record, null, 2));

			if (record.eventName === "INSERT") {
				const newUser = record.dynamodb.NewImage;
				const email = newUser.email.S;

				console.log("email:", email);

				const userExists = await checkIfUserExists(email);
				console.log("userExists in Cognito:", userExists);

				if (!userExists) {
					console.log("user doesnt exist in cognito");
					await createUserInCognito(email);
				} else {
					console.log("User already exists in Cognito:", email);
				}
			}
		}

		// return {
		// 	statusCode: 200,
		// 	body: JSON.stringify({ message: "Lambda executed successfully!" }),
		// };
		console.log("Should return 200 now");
		return JSON.stringify({
			statusCode: 200,
			message: "Lambda executed successfully!",
		});
	} catch (error) {
		console.error("Error processing event:", error);
		// return {
		// 	statusCode: 500,
		// 	body: JSON.stringify({ error: error.message }),
		// };
		return JSON.stringify({ statusCode: 500, error: error.message });
	}
};

async function checkIfUserExists(email) {
	const params = {
		UserPoolId: USER_POOL_ID,
		Filter: `email = "${email}"`,
	};

	const command = new ListUsersCommand(params);
	const response = await cognitoClient.send(command);
	return response.Users && response.Users.length > 0;
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
	};

	const command = new AdminCreateUserCommand(params);
	const cognitoAddUserResponse = await cognitoClient.send(command);
	console.log("cognitoAddUserResponse:", cognitoAddUserResponse);
	console.log(
		"TODO: Delete empty createUserInCognito return statement if it doesnt help"
	);
	return "";
}
