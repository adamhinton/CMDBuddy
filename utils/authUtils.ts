import { useDispatch } from "react-redux";
import { setUser, logOutUser } from "../redux/slices/authSlice";
import { setCommands, logOutCommands } from "../redux/slices/commandsSlice";
import { getSortedCommandsAndParameters } from "./customGraphQLQueries";
import { getUserDarkModePreference } from "./darkModeUtils";
import { setIsDarkMode } from "../redux/slices/darkModeSlice";
import { deleteCommandToEdit } from "../redux/slices/editCommandSlice";
import { deleteAllActiveCommands } from "../redux/slices/activeCommandsSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface CognitoLoggedInUserAttributes {
	sub: string;
	email_verified: boolean;
	email: string;
	data: [any];
}

interface CognitoLoggedInUser {
	storage: any;
	attributes: CognitoLoggedInUserAttributes;
}

export const useAuthActions = () => {
	const dispatch = useDispatch();

	const setUserAndCommandsToState = async (
		cognitoLoggedInUser: CognitoLoggedInUser
	) => {
		try {
			// Get user's Commands (with each Command's Parameters) from db. Commands and parameters are sorted by their `order` property.
			const userFromDB = await getSortedCommandsAndParameters(
				"email",
				cognitoLoggedInUser.attributes.email
			);

			// Set user info to auth state
			dispatch(setUser(userFromDB));

			// Now set Commands (and their Parameters) to Commands state, if they exist
			userFromDB.commands && dispatch(setCommands(userFromDB.commands));

			// Now set dark mode pref to state
			const darkModePreference = getUserDarkModePreference(userFromDB);
			dispatch(setIsDarkMode(darkModePreference));
		} catch (error) {
			console.error("Error setting user and commands to state:", error);
		}
	};

	/**Redux logout actions.
	 *
	 * Set user and Commands/Parameters global state to null.
	 */
	const logOutRedux = (router: AppRouterInstance) => {
		try {
			// Reset all state to null
			dispatch(logOutCommands());
			dispatch(logOutUser());
			dispatch(deleteCommandToEdit());
			dispatch(deleteAllActiveCommands());
			router.push("login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return { setUserAndCommandsToState, logOutRedux };
};
