"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "@/app/commands/page";
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";

Amplify.configure({ config, ssr: true });

interface BobAttributes {
	sub: string;
}

interface Bob {
	attributes: BobAttributes;
}

const getMyUser = async (): Promise<Bob | null> => {
	const bob = await Auth.currentAuthenticatedUser();
	return bob;
};

export default function AuthClientComponent(): any {
	const dispatch = useDispatch();
	const [bob, setBob] = useState<Bob | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setBob(initUser);

			if (bob?.attributes?.sub) {
				try {
					const userId = bob.attributes.sub;
					const result = await API.graphql(
						graphqlOperation(customCommandsAndParametersByUserID, {
							userID: userId,
						})
					);
					dispatch(setUser(result));
				} catch (error) {
					console.log("Error in customCommands query:", error);
				}
			}
		};
		fetchData();
	}, [dispatch, bob?.attributes?.sub]);

	return <h1>Test auth.client</h1>;
}
