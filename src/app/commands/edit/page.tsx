"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import CommandCreationOrEditForm, {
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
			{commandToEdit && <h3>Edit your command here</h3>}
			{commandToEdit && (
				<CommandCreationOrEditForm
					componentMode={ComponentMode.editExistingCommand}
					commandToEdit={commandToEdit}
				></CommandCreationOrEditForm>
			)}
		</section>
	);
};

export default CommandsEditPage;
