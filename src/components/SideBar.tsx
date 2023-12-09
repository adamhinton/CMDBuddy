// README:
// This is a sidebar component that displays the list of the user's saved Commands by their Title.
// Features:
// Edit command title
// Delete whole command
// Clicking a command brings it up in the main UI (TODO)
// Drag and Drop: Can re-order commands in Sidebar. This updates their order in redux state and the db.
// The DnD is the reason for `localCommands` state. localCommands reflects the unsaved changes to commands order. We only pass those to redux state (and the db) when they hit Save.

// TODO: Getting this error because of DnD somewhere. Look in to it. It doesn't seem to affect functionality.
// VM1313:3 Symbol.observable as defined by Redux and Redux DevTools do not match. This could cause your app to behave differently if the DevTools are not loaded. Consider polyfilling Symbol.observable before Redux is imported or avoid polyfilling Symbol.observable altogether.

"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
	editCommandTitle,
	deleteCommand,
	reorderCommands,
} from "../../redux/slices/commandsSlice";
import { API, graphqlOperation } from "aws-amplify";
import {
	updateCommand,
	deleteCommand as deleteCommandMutation,
	deleteParameter,
} from "@/graphql/mutations";
import { CMDBuddyCommand } from "../../utils/zod/CommandSchema";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableProps,
} from "react-beautiful-dnd";

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

// This is a fix for an issue where DnD didn't play nice with Strict Mode. plays a quick animation before performing the action.
// Don't ask me why this is necessary, I just got an error and copied the solution off of Google.
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));

		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);

	if (!enabled) {
		return null;
	}

	return <Droppable {...props}>{children}</Droppable>;
};

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

	// localCommands is used for drag and drop changes of the commands' order
	const [localCommands, setLocalCommands] = useState(commands || []);
	// Track if user is currently editing order with DnD.
	const [hasChanges, setHasChanges] = useState(false);

	const onDragEnd = (result: any) => {
		console.log("onDragEnd");
		if (!result.destination) return;

		const items = Array.from(localCommands || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setLocalCommands(items);
		setHasChanges(true); // tracks if user is currently changing order of commands with DnD

		// Dispatch action to update order in Redux and DB here
		// dispatch(reorderCommands(items));
	};

	// User has saved their DnD changes to command order, so save that to redux state and db
	const handleDnDSave = () => {
		// Dispatch the update to Redux
		dispatch(reorderCommands(localCommands));
		setHasChanges(false);
		// TODO: Save changes to db as well
	};

	// Cancel command order edits and revert the localCommands to match Redux state
	const handleDnDCancel = () => {
		setLocalCommands(commands!);
		setHasChanges(false);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{hasChanges && (
				<div>
					<button onClick={handleDnDSave}>Save</button>
					<button onClick={handleDnDCancel}>Cancel</button>
				</div>
			)}
			<StrictModeDroppable droppableId="commands">
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
			</StrictModeDroppable>
		</DragDropContext>
	);
};

export default SideBar;
