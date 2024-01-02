"use client";

// README:
// User goes to this page to edit an existing Command
// This saves parameter/command specs to the db.
// This is different from the client-side process of generating commands by supplying values for parameters - that's done at commands/generate with CommandExecutionForm.tsx.

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
// This is actually called CommandCreationOrEditForm but I'm calling it this to be descriptive here
import CommandEditForm, {
	ComponentMode,
} from "@/components/CommandCreationComponents/CommandCreationOrEditForm";
Amplify.configure({ ...config, ssr: true });

const CommandsEditPage = () => {
	const commandToEdit = useSelector((state: RootState) => {
		return state.commandToEdit.commandToEdit;
	});

	return (
		<section>
			{!commandToEdit && <h3>Click edit icon in sidebar to edit a command</h3>}
			{commandToEdit && (
				<CommandEditForm
					componentMode={ComponentMode.editExistingCommand}
					commandToEdit={commandToEdit}
				></CommandEditForm>
			)}
		</section>
	);
};

export default CommandsEditPage;
