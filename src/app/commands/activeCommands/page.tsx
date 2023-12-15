"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure(config);

export default function ActiveCommandsPage() {
	return <div>Active Commands here</div>;
}
