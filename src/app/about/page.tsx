"use client";

import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure({ ...config, ssr: true });

const About = () => {
	return <h1>Placeholder: About Page</h1>;
};

export default About;
