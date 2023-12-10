// This is an individual Command - its title, DnD button, delete/edit icons
// This is looped over in SideBar to display each Command

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
// import {
// 	SideBarUtils,

// } from "./SideBarUtils"; // Adjust the path as needed
import {
	// Functions
	SideBarUtils,
	// Styled components
	EditInput,
	Title,
	IconContainer,
	EditButton,
	DeleteButton,
	ConfirmIcon,
	CommandContainer,
	DragHandle,
} from "../../../utils/SidebarUtils";

const CommandInSideBar = ({
	command,
	dragHandleProps,
}: {
	command: CMDBuddyCommand;
	dragHandleProps: any;
}) => {
	const { title, id: commandID } = command;
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [showConfirm, setShowConfirm] = useState(false);
	const editInputRef = useRef<HTMLInputElement>(null);

	// Cancel title editing or deletion confirmation if user clicks away
	const handleOutsideClick = (e: MouseEvent) => {
		// Check if the click is outside the command container
		if (!editInputRef.current?.contains(e.target as Node)) {
			setIsEditing(false);
			setEditedTitle(title);
			setShowConfirm(false);
		}
	};

	const handleCommandTitlesEditSubmit = async () => {
		SideBarUtils.handleCommandTitlesEditSubmit(
			commandID,
			editedTitle,
			dispatch
		);
		setIsEditing(false);
		setEditedTitle(editedTitle);
	};

	const handleCommandDelete = async () => {
		SideBarUtils.handleCommandDelete(command, dispatch);
		setShowConfirm(false);
	};

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
					<ConfirmIcon onClick={() => handleCommandDelete()}>✅</ConfirmIcon>
				) : (
					<DeleteButton onClick={() => setShowConfirm(true)}>🗑️</DeleteButton>
				)}
			</IconContainer>
		</CommandContainer>
	);
};

export default CommandInSideBar;
