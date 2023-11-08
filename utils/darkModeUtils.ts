import { CMDBuddyUser } from "./zod/UserSchema";

function resolveDarkModePreference(user: CMDBuddyUser | null = null): boolean {
	let darkModePreference: boolean = true;

	console.log(
		"TODO: Set darkmode localStorage and system preference functionality. "
	);

	if (user && user.darkMode) {
		darkModePreference = user.darkMode;
	} else {
		// Need to actually write the logic in Header toggle button for setting this to localStorage. Right now the localStorage part of this does nothing
		darkModePreference =
			localStorage.getItem("isDarkMode") === "true"
				? true
				: localStorage.getItem("isDarkMode") === "false"
				? false
				: getSystemDarkModePreference();
	}

	// Dispatch action to Redux store to set dark mode
	// dispatch(setDarkModePreference(darkModePreference));

	return darkModePreference;
}

function getSystemDarkModePreference() {
	// Access system preference here (e.g., via window.matchMedia)
	return (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);
}
