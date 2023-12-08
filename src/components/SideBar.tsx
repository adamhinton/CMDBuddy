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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SideBarContainer = styled.div`
	width: 250px;
	color: ${({ theme }) => theme.text};
	height: 100vh;
	overflow-y: auto;
	padding: 10px;
`;

// The little handle on left side of command that you hold down to drag and drop
const DragHandle = styled.div`
	width: 20px;
	height: 20px;
	background-color: #ccc;
	border-radius: 4px;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
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
	cursor: pointer;
`;

const Command = ({
	command,
	dragHandleProps,
}: {
	command: CMDBuddyCommand;
	dragHandleProps: any;
}) => {
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
				setEditedTitle(title);
				setShowConfirm(false);
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
			<DragHandle {...dragHandleProps}>⋮⋮</DragHandle>
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
	const dispatch = useDispatch();
	const commands = useSelector((state: RootState) => state.commands.commands);
	const [localCommands, setLocalCommands] = useState(commands || []);

	const onDragEnd = (result: any) => {
		console.log("onDragEnd");
		if (!result.destination) return;

		const items = Array.from(localCommands || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setLocalCommands(items);
		// Dispatch action to update order in Redux and DB here
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="commands">
				{(provided) => (
					<SideBarContainer
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{localCommands?.map((command, index) => (
							<Draggable
								key={String(command.id)}
								draggableId={String(command.id)}
								index={index}
							>
								{(provided) => {
									console.log("provided:", provided);
									if (!provided) {
										console.log("provided doesn't exist");
									}
									return (
										<div ref={provided.innerRef} {...provided.draggableProps}>
											<Command
												command={command}
												dragHandleProps={provided.dragHandleProps}
											/>
										</div>
									);
								}}
							</Draggable>
						))}
						{provided.placeholder}
					</SideBarContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SideBar;
