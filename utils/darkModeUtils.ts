import { CMDBuddyUser } from "./zod/UserSchema";
import { graphqlOperation, API } from "aws-amplify";
import { updateUser } from "@/graphql/mutations";
import { getUser } from "@/graphql/queries";

const localStorageDarkModeKey = "isDarkMode";

export function getUserDarkModePreference(
	user: CMDBuddyUser | null = null
): boolean {
	let darkModePreference: boolean;

	// Check user preference in db first
	if (user?.darkMode !== undefined) {
		return user.darkMode;
	}

	// If there's no user or user has no preference, check local storage
	const localStorageDarkMode = localStorage.getItem(localStorageDarkModeKey);
	if (localStorageDarkMode) {
		return localStorageDarkMode === "true";
	}

	// Default to system preference if no user preference or local storage value is set
	return getSystemDarkModePreference();
}

function getSystemDarkModePreference(): boolean {
	if (typeof window !== "undefined") {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	}
	// This app will be dark mode by default if no preference
	return true;
}
// The Redux dispatch can be done where this function is invoked
// dispatch(setDarkModePreference(getUserDarkModePreference(user)));

export function setDarkModeLocalStorage(isDarkMode: boolean): void {
	try {
		localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
	} catch (error) {
		console.error("Could not save dark mode preference to localStorage", error);
	}
}

export const toggleUserDarkModeInDB = async (
	userId: string,
	newDarkModeValue: boolean
) => {
	const user = await API.graphql(
		graphqlOperation(getUser, { id: "e75148e1-7fbe-4c5f-bd5d-03f55ae6ce24" })
	);

	try {
		const input = {
			id: userId,
			darkMode: newDarkModeValue,
		};

		await API.graphql(graphqlOperation(updateUser, { input }));

		// TODO: Implement a Toast notification for success and failure cases
	} catch (error) {
		console.error("Failed to update dark mode setting:", error);
		// TODO: Show error toast once Toastify is set up
	}
};
