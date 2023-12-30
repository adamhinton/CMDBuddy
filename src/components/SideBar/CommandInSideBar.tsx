// README:
// This is an individual Command - its title, DnD button, delete/edit icons.
// This is looped over in SideBar to display each Command.
// Clicking the 'Activate Command' "+" button will add the command to activeCommands and redirect to /commands/generate.
// Clicking the "edit" icon will redirect the user to /commands/edit and set that command to edit redux state.

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setCommandToEdit } from "../../../redux/slices/editCommandSlice";
import { RootState } from "../../../redux/store";

const CommandInSideBar = ({
	command,
	dragHandleProps,
}: {
	command: CMDBuddyCommand;
	dragHandleProps: any;
}) => {
	const commandToEdit = useSelector(
		(state: RootState) => state.commandToEdit.commandToEdit
	);

	console.log("commandToEdit (delete this later):", commandToEdit);

	const { title, id: commandID } = command;
	const dispatch = useDispatch();
	const router = useRouter();

	// Delete command stuff
	const [showConfirm, setShowConfirm] = useState(false);
	const confirmRef = useRef<HTMLDivElement>(null);

	// This useEffect handles the user clicking the `edit` or `delete` buttons then clicking away to cancel.
	useEffect(() => {
		// Clicking away cancels the `edit` or `delete` state.
		const handleOutsideClick = (e: any) => {
			let outsideConfirm =
				confirmRef.current && !confirmRef.current.contains(e.target);

			// Cancel command deletion
			if (outsideConfirm) {
				setShowConfirm(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
	}, [command, showConfirm]);

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
			<Title>{title}</Title>
			{/* Buttons  to edit the command's Title or delete the Command */}
			<IconContainer>
				<EditButton
					onClick={() => {
						dispatch(setCommandToEdit(command));
						router.push("/commands/edit");
					}}
				>
					✏️
				</EditButton>
				{showConfirm ? (
					<div ref={confirmRef}>
						<ConfirmIcon
							onClick={async (e) => {
								e.stopPropagation(); // Stop propagation because that messed with deletion flow
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

const ActivateCommandButton = styled.button`
	margin-right: 5px;
`;
