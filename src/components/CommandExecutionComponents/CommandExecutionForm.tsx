// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values
// And displays the completed command on the page.

import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { removeSingleActiveCommand } from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Function
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommand(commandID));
};

const CommandExecutionForm = ({ command }: { command: CMDBuddyCommand }) => {
	const dispatch = useDispatch();
	const parameters = command.parameters;

	return (
		<section>
			<h3>{command.title}</h3>
			{parameters?.map((param) => {
				return <ParameterExecutionForm parameter={param} key={param.id} />;
			})}
			<button
				onClick={(e) => {
					removeCommandOnClick(e, command.id, dispatch);
				}}
			>
				Exit this command
			</button>
		</section>
	);
};

export default CommandExecutionForm;
