import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { setUser, logOutUser } from "../redux/slices/authSlice";
import { setCommands, logOutCommands } from "../redux/slices/commandsSlice";
import {
	customCommandsAndParametersByUserID,
	customUserByEmail,
	getSortedCommandsAndParameters,
} from "./customGraphQLQueries";
import { CMDBuddyUser } from "./zod/UserSchema";
import { getUserDarkModePreference } from "./darkModeUtils";
import { setIsDarkMode } from "../redux/slices/darkModeSlice";
import { GraphQLResult } from "@aws-amplify/api";

// TODO: These two cognito types are defined in two spots; merge them and export them.
interface CognitoLoggedInUserAttributes {
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

	const logOut = () => {
		try {
			dispatch(logOutCommands());
			dispatch(logOutUser());
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return { setUserAndCommandsToState, logOut };
};
