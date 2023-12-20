// README:
// This is an individual Command - its title, DnD button, delete/edit icons.
// This is looped over in SideBar to display each Command.
// Clicking the 'Activate Command' button will add the command to activeCommands and redirect to /commands/generate.

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { addNewActiveCommand } from "../../../redux/slices/activeCommandsSlice";

import {
	SideBarUtils,
	EditInput,
	Title,
	IconContainer,
	EditButton,
	DeleteButton,
	ConfirmIcon,
	CommandContainer,
	DragHandle,
} from "../../../utils/SideBarUtils";
import styled from "styled-components";

const CommandInSideBar = ({
	command,
	dragHandleProps,
}: {
	command: CMDBuddyCommand;
	dragHandleProps: any;
}) => {
	const { title, id: commandID } = command;
	const dispatch = useDispatch();
	const router = useRouter();

	// Edit command title stuff
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const editInputRef = useRef<HTMLInputElement>(null);

	// Delete command stuff
	const [showConfirm, setShowConfirm] = useState(false);
	const confirmRef = useRef<HTMLDivElement>(null);

	// This useEffect handles the user clicking the `edit` or `delete` buttons then clicking away to cancel.
	useEffect(() => {
		// Clicking away cancels the `edit` or `delete` state.
		const handleOutsideClick = (e: any) => {
			let outsideEdit =
				editInputRef.current && !editInputRef.current.contains(e.target);
			let outsideConfirm =
				confirmRef.current && !confirmRef.current.contains(e.target);

			// Cancel editing state
			if (outsideEdit) {
				setIsEditing(false);
				setEditedTitle(title);
			}

			// Cancel command deletion
			if (outsideConfirm) {
				setShowConfirm(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
	}, [command, showConfirm, title]);

	const handleCommandTitlesEditSubmit = async () => {
		SideBarUtils.handleCommandTitlesEditSubmit(
			commandID,
			editedTitle,
			dispatch
		);
		setIsEditing(false);
		setEditedTitle(editedTitle);
	};

	const handleCommandDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		// There's an event handler to cancel deletion state when user clicks away; this stops that from triggering
		e.stopPropagation();
		SideBarUtils.handleCommandDelete(command, dispatch);
		setShowConfirm(false);
	};

	// Activates command generation form for this command
	const activateCommand = () => {
		dispatch(addNewActiveCommand(command.id));
		router.push("/commands/generate");
	};

	return (
		<CommandContainer>
			{/* Drag and drop stuff */}
			<DragHandle {...dragHandleProps}>⋮⋮</DragHandle>
			{/* Here the user can input a new Title */}
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
			{/* Buttons  to edit the command's Title or delete the Command */}
			<IconContainer>
				<EditButton onClick={() => setIsEditing(!isEditing)}>✏️</EditButton>
				{showConfirm ? (
					<div ref={confirmRef}>
						<ConfirmIcon
							onClick={async (e) => {
								e.stopPropagation(); // Stop propagation
								await handleCommandDelete(e);
							}}
						>
							✅
						</ConfirmIcon>
					</div>
				) : (
					<DeleteButton onClick={() => setShowConfirm(true)}>🗑️</DeleteButton>
				)}
			</IconContainer>
			<ActivateCommandButton onClick={activateCommand}>+</ActivateCommandButton>
		</CommandContainer>
	);
};

export default CommandInSideBar;

const ActivateCommandButton = styled.button``;
