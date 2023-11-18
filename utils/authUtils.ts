import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { setUser, logOutUser } from "../redux/slices/authSlice";
import { setCommands, logOutCommands } from "../redux/slices/commandsSlice";
import { customCommandsAndParametersByUserID } from "./customGraphQLQueries";
import { CMDBuddyCommand } from "./zod/CommandSchema";
import { CMDBuddyUser } from "./zod/UserSchema";

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
			console.log("result in auth.client:", result);

			// This is the object we're actually setting to redux state
			const loggedInUser: CMDBuddyUser = {
				id: cognitoLoggedInUser.attributes.sub,
				email_verified: cognitoLoggedInUser.attributes.email_verified,
				email: cognitoLoggedInUser.attributes.email,
				// commands: result.data.commandsByUserID.items,
				darkMode: cognitoLoggedInUser.storage.store.isDarkMode,
			};
			dispatch(setUser(loggedInUser));
			dispatch(setCommands(result.data.commandsByUserID.items));
		} catch (error) {
			console.error("Error setting user and commands to state:", error);
		}
	};

	const logOut = () => {
		try {
			console.log("logOut running sin authUtils");
			dispatch(logOutCommands());
			dispatch(logOutUser());
		} catch (error) {
			console.error("Error logging out:", error);
			// Handle error appropriately
		}
	};

	return { setUserAndCommandsToState, logOut };
};
