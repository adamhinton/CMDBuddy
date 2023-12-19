"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config, ssr: true });

const CommandsEditPage = () => {
	return <h3>Edit Placeholder</h3>;
};

export default CommandsEditPage;
