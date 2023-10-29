"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { customCommandsAndParametersByUserID } from "@/app/commands/page";
import { API, graphqlOperation, Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Auth } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";

Amplify.configure({ config, ssr: true });

interface BobAttributes {
	sub: string;
	email_verified: boolean;
	email: string;
	data: [any];
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

	// First useEffect to initialize 'bob'
	useEffect(() => {
		const fetchData = async () => {
			const initUser = await getMyUser();
			setBob(initUser);
		};
		fetchData();
	}, [dispatch]); // No dependency on 'bob' or 'bob?.attributes?.sub' here

	// Second useEffect for logic depending on 'bob'
	useEffect(() => {
		const fetchData = async () => {
			if (bob?.attributes?.sub) {
				const userId = bob.attributes.sub;
				// TODO: Better typing for this
				const result: any = await API.graphql(
					graphqlOperation(customCommandsAndParametersByUserID, {
						userID: userId,
					})
				);
				dispatch(setUser(result));

				const experiment = {
					userID: bob.attributes.sub,
					email_verified: bob.attributes.email_verified,
					email: bob.attributes.email,
					commands: result.data.commandsByUserID.items,
				};
				console.log("experiment:", experiment);
			}
		};
		fetchData();
	}, [dispatch, bob?.attributes]);
	return <h1>Test auth.client</h1>;
}
