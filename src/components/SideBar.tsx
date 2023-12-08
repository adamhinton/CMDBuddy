"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
	editCommandTitle,
	deleteCommand,
} from "../../redux/slices/commandsSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
	updateCommand,
	deleteCommand as deleteCommandMutation,
	deleteParameter,
} from "@/graphql/mutations";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";

const SideBarContainer = styled.div`
	width: 250px;
	color: ${({ theme }) => theme.text};
	height: 100vh;
	overflow-y: auto;
	padding: 10px;
`;

const CommandContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;
`;

const EditInput = styled.input`
	flex-grow: 1;
	border: 2px solid blue; /* Example outline style */
	padding: 4px;
	&:focus {
		outline: 3px solid green; /* More prominent outline when focused */
	}
`;

const Title = styled.span`
	flex-grow: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const EditButton = styled.button`
	margin-right: 10px;
	background: none;
	border: none;
	cursor: pointer;
`;

const DeleteButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const ConfirmIcon = styled.span`
	margin-left: 5px;
	cursor: pointer; /* Change cursor to pointer on hover */
`;

const Command = ({ command }: { command: CMDBuddyCommand }) => {
	const { title, id: commandID, parameters } = command;
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [showConfirm, setShowConfirm] = useState(false);
	const editInputRef = useRef<HTMLInputElement>(null);

	const handleCommandTitlesEditSubmit = async () => {
		// Optimistic UI update
		dispatch(editCommandTitle({ commandId: commandID, newTitle: editedTitle }));

		// Update the database
		const commandDetails = { id: commandID, title: editedTitle };
		await API.graphql(
			graphqlOperation(updateCommand, { input: commandDetails })
		);

		setIsEditing(false);
		setEditedTitle(editedTitle);
	};

	const handleCommandDelete = async (command: CMDBuddyCommand) => {
		// Optimistic UI update
		dispatch(deleteCommand(command.id));
		setShowConfirm(false);

		// Delete each parameter
		console.log("parameters.length:", parameters?.length);
		if (parameters && parameters.length > 0) {
			for (const parameter of parameters) {
				console.log("parameter deleting:", parameter);
				await API.graphql(
					graphqlOperation(deleteParameter, {
						input: { id: parameter.id },
					})
				);
			}
		}

		// Delete the command from the database
		await API.graphql(
			graphqlOperation(deleteCommandMutation, { input: { id: command.id } })
		);
	};

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				editInputRef.current &&
				!editInputRef.current.contains(e.target as Node)
			) {
				setIsEditing(false);
				setEditedTitle(title); // Reset title
				setShowConfirm(false); // Reset showConfirm for delete
			}
		};

		if (isEditing || showConfirm) {
			document.addEventListener("click", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [isEditing, showConfirm, title]);

	return (
		<CommandContainer>
			{isEditing ? (
				<EditInput
					ref={editInputRef}
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					onBlur={handleCommandTitlesEditSubmit}
					onKeyDown={(e) =>
						e.key === "Enter" && handleCommandTitlesEditSubmit()
					}
				/>
			) : (
				<Title>{title}</Title>
			)}
			<IconContainer>
				<EditButton onClick={() => setIsEditing(!isEditing)}>✏️</EditButton>
				{showConfirm ? (
					<ConfirmIcon onClick={() => handleCommandDelete(command)}>
						✅
					</ConfirmIcon>
				) : (
					<DeleteButton onClick={() => setShowConfirm(true)}>🗑️</DeleteButton>
				)}
			</IconContainer>
		</CommandContainer>
	);
};

const SideBar = () => {
	const commands = useSelector((state: RootState) => state.commands.commands);

	return (
		<SideBarContainer>
			{commands?.map((command, index) => (
				<Command key={index} command={command} />
			))}
		</SideBarContainer>
	);
};

export default SideBar;
