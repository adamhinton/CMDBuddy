// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values
// And displays the completed command on the page.

import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

const CommandExecutionForm = (command: CMDBuddyCommand) => {
	return <div>Command: {command.title}</div>;
};

export default CommandExecutionForm;
