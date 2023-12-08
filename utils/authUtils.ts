import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { setUser, logOutUser } from "../redux/slices/authSlice";
import { setCommands, logOutCommands } from "../redux/slices/commandsSlice";
import {
	customCommandsAndParametersByUserID,
	customUserByEmail,
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
			const userFromDB: GraphQLResult<any> = await API.graphql(
				graphqlOperation(customUserByEmail, {
					email: cognitoLoggedInUser.attributes.email,
				})
			);

			// Set user info (except Commands) to User state
			const loggedInUser: CMDBuddyUser = {
				id: userFromDB.data.userByEmail.items[0].id,
				email_verified: cognitoLoggedInUser.attributes.email_verified,
				email: userFromDB.data.userByEmail.items[0].email,
				darkMode: userFromDB.data.userByEmail.items[0].darkMode,
			};
			dispatch(setUser(loggedInUser));

			// Now set Commands (and their Parameters) to Commands state
			const userCommandsFromDB =
				userFromDB.data.userByEmail.items[0].commands.items;

			// "parameters" is returned from the db here as an object with an "items" key, but we want it to just be an array of parameters.
			// So we mutate parameters from object to array.
			for (const command of userCommandsFromDB) {
				command.parameters = command.parameters.items;
			}
			console.log("userCommandsFromDB", userCommandsFromDB);

			dispatch(setCommands(userCommandsFromDB));

			// Now set dark mode pref to state
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
