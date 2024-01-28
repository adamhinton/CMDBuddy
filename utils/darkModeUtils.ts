import { CMDBuddyUser } from "./zod/UserSchema";
import { graphqlOperation, API } from "aws-amplify";
import { updateUser } from "@/graphql/mutations";
import { getUser } from "@/graphql/queries";
import { toast } from "react-toastify";

const localStorageDarkModeKey = "isDarkMode";

/**Attempts to determine user's dark mode preference.
 *
 * Checks (in order): Account preference, localStorage, system preference
 */
export function getUserDarkModePreference(
	user: CMDBuddyUser | null = null
): boolean {
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
	} catch (error) {
		console.error("Failed to update dark mode setting:", error);
		toast(
			"Error setting dark mode preference. If issue persists, please contact admin."
		);
	}
};
