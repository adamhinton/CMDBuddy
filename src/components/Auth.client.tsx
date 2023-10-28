"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "@/app/commands/page";
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";

Amplify.configure({ config, ssr: true });

interface AuthClientProps {
	user: { [key: string]: any } | null;
}

interface BobAttributes {
	sub: string;
	// add other attributes as needed
}

interface Bob {
	attributes: BobAttributes;
	// add other properties as needed
}

const getMyUser = async (): Promise<Bob | null> => {
	const bob = await Auth.currentAuthenticatedUser();
	return bob;
};

export default function AuthClientComponent({ user }: AuthClientProps): any {
	const dispatch = useDispatch();
	const [bob, setBob] = useState<Bob | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setBob(initUser);
			console.log("bob:", bob);
			console.log("bob.attributes.sub:", bob?.attributes.sub);

			if (bob && bob?.attributes?.sub) {
				try {
					console.log("bob in Auth.client.ts try:", bob);
					const userId = bob.attributes.sub;
					const result = await API.graphql(
						graphqlOperation(customCommandsAndParametersByUserID, {
							userID: userId,
						})
					);
					dispatch(setUser(result));
					console.log("result:", result);
				} catch (error) {
					console.log("Error:", error);
				}
			}
		};
		fetchData();
	}, [user, dispatch, bob?.attributes?.sub]);

	return <h1>Test auth.client</h1>;
}
