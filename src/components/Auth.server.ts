import { Auth, Amplify } from "aws-amplify";

import config from "../../src/aws-exports";
Amplify.configure({ ...config, ssr: true });

export default async function AuthServerComponent(): Promise<{
	[key: string]: any;
} | null> {
	try {
		// Original
		// const user = await Auth.currentAuthenticatedUser();
		const user = await Auth.currentUserInfo();
		console.log("user in Auth.server:", user);
		return user;
	} catch (error) {
		console.log("Error in Auth.server:", error);
		return null;
	}
}
