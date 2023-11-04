"use client";
import { Amplify } from "aws-amplify";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../aws-exports";
import { CMDBuddyUser } from "../../../utils/zod/UserSchema";
import Link from "next/link";
Amplify.configure(config);

// TODO: Move this function somewhere else
// Gets Commands by userID along with Commands' Parameters
export const customCommandsAndParametersByUserID = /* GraphQL */ `
	query CommandsByUserID($userID: ID!) {
		commandsByUserID(userID: $userID) {
			items {
				id
				baseCommand
				title
				order
				userID
				parameters {
					items {
						id
						type
						defaultValue
						name
						order
						validationRegex
						length
						minValue
						maxValue
						isNullable
						allowedValues
					}
					nextToken
				}
			}
			nextToken
		}
	}
`;

const Commands = () => {
	console.log("commands refreshing");
	const currentUser: CMDBuddyUser | null = useSelector(
		(state: RootState) => state.auth.user
	);
	console.log("currentUser in commands:", currentUser);
	// const commands = currentUser?.commands;
	const commands = useSelector((state: RootState) => state.commands.commands);
	console.log("commands in /commands/page:", commands);

	return (
		<>
			<h1>Commands Placeholder</h1>
			<Link href="/login">Login page</Link>
			<div>{commands && commands[0].baseCommand}</div>
		</>
	);
};

export default Commands;
