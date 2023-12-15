// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values
// And displays the completed command on the page.

import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { removeSingleActiveCommand } from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Function
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommand(commandID));
};

const CommandExecutionForm = ({ command }: { command: CMDBuddyCommand }) => {
	const methods = useForm({
		defaultValues: {
			// We'll integrate parameters here later
		},
	});

	const dispatch = useDispatch();
	const parameters = command.parameters;

	const { watch } = methods;
	const parameterValues = watch(); // Tracks all parameter values
	console.log("parameterValues:", parameterValues);

	return (
		<FormProvider {...methods}>
			<form>
				<section>
					<header>
						<h3>{command.title}</h3>
					</header>
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
			</form>
		</FormProvider>
	);
};
export default CommandExecutionForm;
