"use client";

// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationOrEditForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values
// And displays the completed command on the page.
// IMPORTANT NOTE about errors: The user has control of this process. The app validates their Parameter value inputs and alerts them if there's an error (e.g. the input is longer than their specified maxLength), but it doesn't stop the user from generating/copying the command. It's only a guideline.

// TODO: Persist CEF state when navigating away. Maybe save form state as sub-value in activeCommands
// TODO: Custom input in dropdown
// TODO: Collapse CEF functionality

// TODO Stretch: In PEF, on hover over a param, show its attributes (maxLength etc)

import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { removeSingleActiveCommand } from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import LiveCommandExecutionPreview from "./LiveCommandExecutionPreview";
import CEFStyles from "../../../utils/CommandExecutionUtils/CommandExecutionStyles";

const {
	ErrorItem,
	ErrorContainer,
	CEFForm,
	CEFHeader,
	CEFCommandTitle,
	CEFButton,
	CEFParametersContainer,
} = CEFStyles;

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Function
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommand(commandID));
};
export type CEFDefaultValues = Record<string, any>;

const CommandExecutionForm = ({ command }: { command: CMDBuddyCommand }) => {
	const methods = useForm({
		// This looks weird but it just sets each parameter's initial value to its defaultValue (if any)
		defaultValues: command.parameters?.reduce(
			(acc: CEFDefaultValues, param) => {
				acc[param.name] = param.defaultValue || ""; // Set default value or fallback to empty string
				return acc;
			},
			{} as CEFDefaultValues
		),
	});

	const { getValues } = methods;
	const formState = getValues();
	console.log("formState CEF:", formState);

	const dispatch = useDispatch();
	const parameters = command.parameters;

	const { watch } = methods;

	// Error handling
	// Display parameter errors here rather than in individual Parameter inputs to reduce clutter
	// This displays a max of three errors at a time
	// Shows parameter's name and a brief error message
	const errors = methods.formState.errors;
	// This function will create a list of error elements
	const errorList = Object.keys(errors)
		.slice(0, 3) // Limit to a maximum of three errors
		.map((key) => (
			<ErrorItem key={key}>{`${key}: ${errors[key]!.message}`}</ErrorItem>
		));

	return (
		<FormProvider {...methods}>
			<CEFForm>
				<CEFHeader>
					<CEFCommandTitle>{command.title}</CEFCommandTitle>
				</CEFHeader>
				{errorList.length > 0 && <ErrorContainer>{errorList}</ErrorContainer>}
				<LiveCommandExecutionPreview
					baseCommand={command.baseCommand}
					parameters={command.parameters}
				/>
				<CEFParametersContainer>
					{parameters?.map((param) => {
						return (
							<ParameterExecutionForm
								parameter={param}
								key={param.id}
								methods={methods}
							/>
						);
					})}
				</CEFParametersContainer>

				<CEFButton
					onClick={(e) => {
						removeCommandOnClick(e, command.id, dispatch);
					}}
				>
					Exit this command
				</CEFButton>
				{/* Resets inputs back to their defaultValues, or null if no defaultValue */}
				<CEFButton
					onClick={(e) => {
						e.preventDefault();
						methods.reset();
					}}
				>
					Reset Inputs
				</CEFButton>
			</CEFForm>
		</FormProvider>
	);
};
export default CommandExecutionForm;
