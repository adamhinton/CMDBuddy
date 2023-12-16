// README:
// This is an individual Command - its title, DnD button, delete/edit icons.
// This is looped over in SideBar to display each Command.
// Clicking the 'Activate Command' button will add the command to activeCommands and redirect to /commands/generate.

import React, { useState, useRef } from "react";
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
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [showConfirm, setShowConfirm] = useState(false);
	const editInputRef = useRef<HTMLInputElement>(null);

	const handleOutsideClick = (e: MouseEvent) => {
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

	const activateCommand = () => {
		dispatch(addNewActiveCommand(command.id));
		router.push("/commands/generate");
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
			<ActivateCommandButton onClick={activateCommand}>+</ActivateCommandButton>
		</CommandContainer>
	);
};

export default CommandInSideBar;

const ActivateCommandButton = styled.button``;
