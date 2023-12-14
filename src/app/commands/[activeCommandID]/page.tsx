"use client";
import { Amplify, Auth } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config });

import { useEffect } from "react";

export default function Page({
	params,
}: {
	params: { activeCommandID: string };
}) {
	useEffect(() => {
		console.log("commandid/page useEffect");
	});

	return <div>My Post: {params.activeCommandID}</div>;
}
