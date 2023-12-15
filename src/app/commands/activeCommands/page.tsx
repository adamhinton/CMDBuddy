"use client";
import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config });

import { useEffect } from "react";

export default function Page() {
	useEffect(() => {
		console.log("commandid/page useEffect");
	});

	return <div>Multiple Commands Here</div>;
}
