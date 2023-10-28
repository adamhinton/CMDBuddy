// /app/Auth.server.ts
import { Auth } from "aws-amplify";

export default async function AuthServerComponent(): Promise<{
	[key: string]: any;
} | null> {
	const user = await Auth.currentUserInfo();
	console.log("user in Auth.server:", user);
	return user;
}
