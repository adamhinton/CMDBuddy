import { CMDBuddyUser } from "./zod/UserSchema";

function resolveDarkModePreference(user: CMDBuddyUser | null = null): boolean {
	// Check user preference in db first
	if (user?.darkMode !== undefined) {
		return user.darkMode;
	}

	// If there's no user or user has no preference, check local storage
	const localStorageDarkMode = localStorage.getItem("isDarkMode");
	if (localStorageDarkMode) {
		return localStorageDarkMode === "true";
	}

	// Default to system preference if no user preference or local storage value is set
	return getSystemDarkModePreference();
}

function getSystemDarkModePreference(): boolean {
	if (window) {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	}
	// This app will be dark mode by default if no preference
	return true;
}

// The Redux dispatch can be done where this function is invoked
// dispatch(setDarkModePreference(resolveDarkModePreference(user)));
