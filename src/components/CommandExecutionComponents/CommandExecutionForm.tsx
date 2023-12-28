// README:
// In this form, the user enters in values for Parameters.
// They should have already created a Command and its Parameters. If they haven't, see CommandCreationForm.tsx
// This page dynamically generates the Command and its Parameters with the inputted values
// And displays the completed command on the page.

// TODO: Persist CEF state when navigating away
// TODO: Custom input in dropdown

import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { removeSingleActiveCommand } from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import LiveCommandExecutionPreview from "./LiveCommandExecutionPreview";
import styled from "styled-components";

export const CEFFormContainer = styled.form`
	background: ${({ theme }) => theme.commandGeneration.baseBackground};
	color: ${({ theme }) => theme.commandGeneration.baseText};
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
`;

const CEFHeader = styled.header`
	padding-bottom: 1rem;
	border-bottom: 2px solid ${({ theme }) => theme.commandGeneration.baseText};
	margin-bottom: 1rem;
`;

const CEFCommandTitle = styled.h3`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.commandGeneration.baseText};
`;

export const CEFInput = styled.input`
	max-width: 250px;
	padding: 0.5rem;
	margin: 0.75rem 0;
	box-sizing: border-box;
	border: 1px solid ${({ theme }) => theme.commandGeneration.inputText};
	border-radius: 4px;
	background: ${({ theme }) => theme.commandGeneration.inputBackground};
	color: ${({ theme }) => theme.colors.text};
`;

export const CEFLabel = styled.label`
	font-weight: bold;
	display: flex;
	align-items: center;
	margin-right: 5px;
	margin-bottom: 0.25rem;
`;

export const CEFButton = styled.button`
	background: ${({ theme }) => theme.commandGeneration.buttonBackground};
	color: ${({ theme }) => theme.commandGeneration.baseText};
	padding: 0.5rem 0.75rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background: ${({ theme }) => theme.commandGeneration.buttonHoverBackground};
	}
`;

export const CEFSelect = styled.select`
	width: 250px;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border: 1px solid ${({ theme }) => theme.commandGeneration.inputText};
	border-radius: 4px;
	background: ${({ theme }) => theme.commandGeneration.selectBackground};
	color: ${({ theme }) => theme.commandGeneration.selectText};
`;

export const CEFOption = styled.option`
	padding: 0.5rem;
	background: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
`;

const removeCommandOnClick = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	commandID: string,
	dispatch: Function
): void => {
	e.preventDefault();
	dispatch(removeSingleActiveCommand(commandID));
};
type DefaultValues = Record<string, any>;

const CommandExecutionForm = ({ command }: { command: CMDBuddyCommand }) => {
	const methods = useForm({
		// This looks weird but it just sets each parameter's initial value to its defaultValue (if any)
		defaultValues: command.parameters?.reduce((acc: DefaultValues, param) => {
			acc[param.name] = param.defaultValue || ""; // Set default value or fallback to empty string
			return acc;
		}, {} as DefaultValues),
	});

	const dispatch = useDispatch();
	const parameters = command.parameters;

	const { watch } = methods;
	const parameterValues = watch(); // Tracks all inputted parameter values

	return (
		<FormProvider {...methods}>
			<CEFFormContainer>
				<CEFHeader>
					<CEFCommandTitle>{command.title}</CEFCommandTitle>
				</CEFHeader>
				<LiveCommandExecutionPreview
					baseCommand={command.baseCommand}
					parameters={command.parameters}
				/>
				{parameters?.map((param) => {
					return <ParameterExecutionForm parameter={param} key={param.id} />;
				})}
				<CEFButton
					onClick={(e) => {
						removeCommandOnClick(e, command.id, dispatch);
					}}
				>
					Exit this command
				</CEFButton>
			</CEFFormContainer>
		</FormProvider>
	);
};
export default CommandExecutionForm;
