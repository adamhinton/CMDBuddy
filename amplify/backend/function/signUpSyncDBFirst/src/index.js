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
exports.handler = async (event) => {
	console.log(`EVENT: ${JSON.stringify(event)}`);
	return {
		statusCode: 200,
		body: JSON.stringify("Hello from Lambda!"),
	};
};
