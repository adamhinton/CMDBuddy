"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ config, ssr: true });

import CommandCreationForm from "@/components/CommandCreationComponents/CommandCreationForm";

const CreateCommandsPage = () => {
	return <CommandCreationForm />;
};

export default CreateCommandsPage;
