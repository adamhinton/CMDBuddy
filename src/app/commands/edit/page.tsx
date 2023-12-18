"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
Amplify.configure({ ...config, ssr: true });

const EditPage = () => {
	return <h2>Edit Page Placeholder</h2>;
};

export default EditPage;
