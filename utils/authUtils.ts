import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { setUser, logOutUser } from "../redux/slices/authSlice";
import { setCommands, logOutCommands } from "../redux/slices/commandsSlice";
import { customCommandsAndParametersByUserID } from "./customGraphQLQueries";
import { CMDBuddyCommand } from "./zod/CommandSchema";
import { CMDBuddyUser } from "./zod/UserSchema";
import { getUserDarkModePreference } from "./darkModeUtils";
import { setIsDarkMode } from "../redux/slices/darkModeSlice";

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
			const result = (await API.graphql(
				graphqlOperation(customCommandsAndParametersByUserID, {
					userID: cognitoLoggedInUser.attributes.sub,
				})
			)) as { data: { commandsByUserID: { items: CMDBuddyCommand[] } } };

			// This is the object we're actually setting to redux state
			const loggedInUser: CMDBuddyUser = {
				id: cognitoLoggedInUser.attributes.sub,
				email_verified: cognitoLoggedInUser.attributes.email_verified,
				email: cognitoLoggedInUser.attributes.email,
				darkMode: Boolean(cognitoLoggedInUser.storage.store.isDarkMode),
			};
			console.log("loggedInUser:", loggedInUser);
			dispatch(setUser(loggedInUser));
			dispatch(setCommands(result.data.commandsByUserID.items));
			const darkModePreference = getUserDarkModePreference(loggedInUser);
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
