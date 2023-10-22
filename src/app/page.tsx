// prettier-ignore
"use client";
import styles from "./page.module.css";
import UserCreateForm from "@/ui-components/UserCreateForm";
import { Amplify } from "aws-amplify";
import config from "../aws-exports"; // adjust the path as needed

Amplify.configure(config);

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Adam Hinton</h1>
			<UserCreateForm />
		</main>
	);
}
