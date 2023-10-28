"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "./commands/page";
import { API, Auth, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure(config);

interface AuthClientProps {
	user: { [key: string]: any } | null;
}

export default function AuthClientComponent({ user }: AuthClientProps): any {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			if (user) {
				try {
					console.log("user in Auth.client.ts:", user);
					const userId = user.attributes.sub;
					const result = await API.graphql(
						graphqlOperation(customCommandsAndParametersByUserID, {
							userID: userId,
						})
					);
					dispatch(setUser(result));
					console.log("result:", result);
				} catch (error) {
					console.log("Not authenticated");
				}
			}
		})();
	}, [user, dispatch]);

	return <h1>Test auth.client</h1>;
}
