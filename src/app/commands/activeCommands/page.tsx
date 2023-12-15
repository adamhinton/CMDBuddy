"use client";
import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config });
import { RootState } from "../../../../redux/store";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Page() {
	const activeCommandIDs = useSelector(
		(state: RootState) => state.activeCommands.activeCommands
	);
	console.log("activeCommandIDs:", activeCommandIDs);

	useEffect(() => {
		console.log("commands/active/page useEffect");
	});

	return <div>Multiple Commands Here</div>;
}
