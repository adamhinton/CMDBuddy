"use client";
import { Amplify } from "aws-amplify";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });

const Commands = () => {
	const commands = useSelector((state: RootState) => state.commands.commands);
	console.log("commands:", commands);

	return (
		<section>
			<h1>Commands</h1>
			{commands && commands[0] && <div>{commands[0].baseCommand}</div>}
			{!commands && (
				<div>
					Add some commands <Link href="/create">here!</Link>
				</div>
			)}
		</section>
	);
};

export default Commands;
