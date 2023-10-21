// prettier-ignore
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserCreateForm from "@/ui-components/UserCreateForm";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Adam Hinton</h1>
			<UserCreateForm />
		</main>
	);
}
