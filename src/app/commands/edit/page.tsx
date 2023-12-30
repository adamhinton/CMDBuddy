"use client";

import { Amplify } from "aws-amplify";
import config from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import CommandCreationOrEditForm from "@/components/CommandCreationComponents/CommandCreationForm";
Amplify.configure({ ...config, ssr: true });

const CommandsEditPage = () => {
	const commandToEdit = useSelector((state: RootState) => {
		return state.commandToEdit.commandToEdit;
	});

	console.log("commandToEdit in edit/page:", commandToEdit);

	return (
		<section>
			{!commandToEdit && <h3>Click edit icon in sidebar to edit a command</h3>}
			{commandToEdit && <h3>Edit your command here</h3>}
			{commandToEdit && (
				<CommandCreationOrEditForm
					componentMode="editExistingCommand"
					commandToEdit={commandToEdit}
				></CommandCreationOrEditForm>
			)}
		</section>
	);
};

export default CommandsEditPage;
