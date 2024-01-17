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

// TODO: In PEF, on hover over a param, show its attributes (maxLength etc)

import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { removeSingleActiveCommand } from "../../../redux/slices/activeCommandsSlice";
import { useDispatch } from "react-redux";
import ParameterExecutionForm from "./ParameterExecutionForm";
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import LiveCommandExecutionPreview from "./LiveCommandExecutionPreview";
import styled from "styled-components";

export const CEFForm = styled.form`
	background: ${({ theme }) => theme.commandGeneration.baseBackground};
	color: ${({ theme }) => theme.commandGeneration.baseText};
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
`;

const CEFHeader = styled.header`
	padding-bottom: 0.3rem;
	border-bottom: 2px solid ${({ theme }) => theme.commandGeneration.baseText};
	margin-bottom: 1rem;
`;

const CEFCommandTitle = styled.h3`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.commandGeneration.baseText};
	margin: 0.5rem 0;
`;

// Error container that will hold multiple error messages
// Will have a maximum of three ErrorItems
const ErrorContainer = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0 0 1rem 0;
	max-height: 100px;
	overflow-y: auto; // Allows scrolling if there are more errors than can be displayed
	background-color: ${({ theme }) => theme.commandGeneration.errorBackground};
`;

// Individual error message styling
// Up to three of these at a time will be in Error Container
const ErrorItem = styled.li`
	color: ${({ theme }) => theme.commandGeneration.errorTextColor};
	background-color: ${({ theme }) =>
		theme.commandGeneration.errorItemBackground};
	border-left: 4px solid
		${({ theme }) => theme.commandGeneration.errorBorderLeftColor};
	padding: 0.5rem;
	margin-bottom: 0.5rem; // Gives space between individual errors
`;

type CEFTextInputProps = {
	inputtype: "STRING" | "INT" | "OTHER";
	hasError?: boolean; // Optional boolean prop to indicate error state
};

export const CEFInput = styled.input<CEFTextInputProps>`
	max-width: 250px;
	padding: 0.5rem;
	width: ${(props) =>
		props.inputtype === "STRING"
			? "250px"
			: props.inputtype === "INT"
			? "100px"
			: null};
	margin: 0.75rem 1rem;
	box-sizing: border-box;
	border: 1px solid ${({ theme }) => theme.commandGeneration.inputText};
	border-radius: 4px;
	background: ${({ theme, hasError }) =>
		hasError
			? "red"
			: theme.commandGeneration
					.inputBackground}; // Change background to red if there is an error
	color: ${({ theme }) => theme.colors.text};
`;

export const CEFLabel = styled.label`
	font-weight: bold;
	display: flex;
	align-items: center;
	margin-left: 10px;
	margin-right: 3px;
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
	width: 150px;
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

const CEFParametersContainer = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
