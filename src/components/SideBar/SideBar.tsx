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
import { RootState } from "../../../redux/store";
import {
	editCommandTitle,
	deleteCommand,
	reorderCommands,
} from "../../../redux/slices/commandsSlice";
import { SideBarUtils } from "../../../utils/SidebarUtils";
import { API, graphqlOperation } from "aws-amplify";
import {
	updateCommand,
	deleteCommand as deleteCommandMutation,
} from "@/graphql/mutations";
import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableProps,
} from "@hello-pangea/dnd";

import {
	CommandContainer,
	DragHandle,
	EditInput,
	Title,
	IconContainer,
	EditButton,
	ConfirmIcon,
	DeleteButton,
	SideBarContainer,
} from "../../../utils/SidebarUtils";

const { handleCommandTitlesEditSubmit, handleCommandDelete } = SideBarUtils;

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

// A single Command. Just displays its title, DnD grabber, edit and delete button
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

	useEffect(() => {
		// Cancel title editing or deletion confirmation if user clicks away
		const handleOutsideClick = (e: MouseEvent) => {
			// Check if the click is outside the command container
			if (!editInputRef.current?.contains(e.target as Node)) {
				setIsEditing(false);
				setEditedTitle(title);
				setShowConfirm(false);
			}
		};

		// Attach the event listener
		document.addEventListener("click", handleOutsideClick);

		return () => {
			// Clean up the event listener
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [isEditing, showConfirm, title]);

	return (
		<CommandContainer>
			{/* Handle that user holds down to DnD */}
			<DragHandle {...dragHandleProps}>⋮⋮</DragHandle>
			{isEditing ? (
				<EditInput
					ref={editInputRef}
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					onBlur={(e) => {
						handleCommandTitlesEditSubmit(command.id, editedTitle, dispatch);
					}}
					onKeyDown={(e) =>
						e.key === "Enter" &&
						handleCommandTitlesEditSubmit(command.id, editedTitle, dispatch)
					}
				/>
			) : (
				<Title>{title}</Title>
			)}
			{/* container of edit and delete buttons */}
			<IconContainer>
				<EditButton onClick={() => setIsEditing(!isEditing)}>✏️</EditButton>
				{showConfirm ? (
					<ConfirmIcon onClick={() => handleCommandDelete(command, dispatch)}>
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

	// localCommands is used to locally track drag and drop changes of the commands' order, before the user hits Save
	const [localCommands, setLocalCommands] = useState(commands || []);
	// Track if user is currently editing order with DnD.
	const [hasChanges, setHasChanges] = useState(false);

	// UseEffect to synchronize localCommands with Redux state
	useEffect(() => {
		commands && commands.length > 0 && setLocalCommands(commands);
	}, [commands]); // Dependency array includes 'commands' from Redux state

	const onDragEnd = (result: any) => {
		console.log("onDragEnd");
		if (!result.destination) return;

		const items = Array.from(localCommands || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setLocalCommands(items);
		setHasChanges(true); // tracks if user is currently changing order of commands with DnD
	};

	// User has saved their DnD changes to command order, so save that to redux state and db
	const handleDnDSave = async () => {
		// Assign new order based on the current index in localCommands
		const updatedCommands = localCommands.map((cmd, index) => ({
			...cmd,
			order: index + 1,
		}));

		// Create a map of the original order for quick lookup
		const originalOrderMap = new Map(
			commands!.map((cmd) => [cmd.id, cmd.order])
		);

		// Find commands whose order has changed
		const commandsToUpdate = updatedCommands.filter(
			(cmd) => originalOrderMap.get(cmd.id) !== cmd.order
		);

		console.log("commandsToUpdate:", commandsToUpdate);

		// Dispatch the updatedCommands array to Redux
		dispatch(reorderCommands(updatedCommands));
		setHasChanges(false);

		// Update each changed command in the database
		for (const command of commandsToUpdate) {
			const input = {
				id: command.id,
				order: command.order,
			};

			try {
				const newCommandWithOrder = await API.graphql(
					graphqlOperation(updateCommand, { input })
				);
				console.log("newCommandWithOrder:", newCommandWithOrder);
			} catch (error) {
				console.error("Error updating command:", error);
			}
		}
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
					<button onClick={async () => await handleDnDSave()}>Save</button>
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
