// README:
// This is a dummy page, doesn't actually do anything.
// It just exists to support its subroutes - commands/create, commands/generate and commands/edit
// So if a user lands here - if they have commands already they're redirected to /generate; if not they're redirected to /create

"use client";
import { Amplify } from "aws-amplify";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../aws-exports";
import Link from "next/link";
import { useRouter } from "next/navigation";
Amplify.configure({ ...config, ssr: true });

const Commands = () => {
	const commands = useSelector((state: RootState) => state.commands.commands);
	console.log("commands:", commands);

	const router = useRouter();

	useEffect(() => {
		router.push(commands ? "/commands/generate" : "commands/create");
	});

	// The user should never actually see this
	return (
		<section>
			<h1>Commands</h1>
		</section>
	);
};

export default Commands;
