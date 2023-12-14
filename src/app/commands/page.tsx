"use client";
import { Amplify } from "aws-amplify";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../aws-exports";
import { CMDBuddyUser } from "../../../utils/zod/UserSchema";
import Link from "next/link";
import CommandCreationForm from "@/components/CommandCreationComponents/CommandCreationForm";
Amplify.configure({ ...config, ssr: true });

const Commands = () => {
	const currentUser: CMDBuddyUser | null = useSelector(
		(state: RootState) => state.auth.user
	);
	const commands = useSelector((state: RootState) => state.commands.commands);
	console.log("commands:", commands);

	return (
		<>
			<h1>Commands Placeholder</h1>
			<Link href="/login">Login page</Link>
			<div>{commands && commands[0] && commands[0].baseCommand}</div>
			<CommandCreationForm />
		</>
	);
};

export default Commands;
