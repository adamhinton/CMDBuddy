"use client";

// README:
// This is an individual Command - its title, DnD button, delete/edit icons.
// This is looped over in SideBar to display each Command.
// Clicking anywhere on a Command that isn't some kind of button will activate it for command generation.
// Clicking the "edit" icon will redirect the user to /commands/edit and set that command to edit redux state.

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CMDBuddyCommand } from "../../../utils/zod/CommandSchema";
import { addNewActiveCommand } from "../../../redux/slices/activeCommandsSlice";

import {
	SideBarUtils,
	Title,
	IconContainer,
	EditButton,
	DeleteButton,
	ConfirmIcon,
	CommandContainer,
	DragHandle,
} from "../../../utils/SideBarUtils";
import {
	deleteCommandToEdit,
	setCommandToEdit,
} from "../../../redux/slices/editCommandSlice";
import CMDBuddyTooltip from "../../../utils/ToolTipUtils";
import Image from "next/image";
import DragNDropHandleIcon from "../../../utils/images/drag-drop-handle.svg";
import { DragNDropIconImage } from "../../../utils/DragNDropUtils";

const CommandInSideBar = ({
	command,
	dragHandleProps,
}: {
	command: CMDBuddyCommand;
	dragHandleProps: any;
}) => {
	const { title } = command;
	const dispatch = useDispatch();
	const router = useRouter();

	// Delete command stuff
	const [showConfirmDeleteButton, setShowConfirmDeleteButton] = useState(false);
	const confirmRef = useRef<HTMLDivElement>(null);

	// This useEffect handles the user clicking the `edit` or `delete` buttons then clicking away to cancel.
	useEffect(() => {
		// Clicking away cancels the `edit` or `delete` state.
		const handleOutsideClick = (e: any) => {
			let outsideConfirm =
				confirmRef.current && !confirmRef.current.contains(e.target);

			// Cancel command deletion
			if (outsideConfirm) {
				setShowConfirmDeleteButton(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
	}, [command, showConfirmDeleteButton]);

	const handleCommandDelete = async (e: React.MouseEvent) => {
		e.preventDefault();
		// There's an event handler to cancel deletion state when user clicks away; this stops that from triggering
		e.stopPropagation();
		SideBarUtils.handleCommandDelete(command, dispatch);
		setShowConfirmDeleteButton(false);
	};

	// Activates command generation form for this command
	const activateCommand = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(addNewActiveCommand(command.id));
		router.push("/commands/generate");
	};

	return (
		<CommandContainer onClick={activateCommand}>
			{/* Drag and drop stuff */}
			<CMDBuddyTooltip content="Drag to re-order commands">
				<DragHandle {...dragHandleProps} onClick={(e) => e.stopPropagation()}>
					<DragNDropIconImage
						src={DragNDropHandleIcon}
						alt="Drag and drop icon; hold down to drag"
					/>
				</DragHandle>
			</CMDBuddyTooltip>
			<Title>{title}</Title>
			{/* Buttons  to edit the command's Title or delete the Command */}
			<IconContainer>
				<CMDBuddyTooltip content="Edit parameter details">
					<EditButton
						onClick={(e) => {
							// stopPropagation() stops the click from bubbling up to the rest of the component, which would trigger a different onClick
							e.stopPropagation();
							// First get rid of any previous command that was being edited
							dispatch(deleteCommandToEdit());
							// Now set this command to editing state
							dispatch(setCommandToEdit(command));
							router.push("/commands/edit");
						}}
					>
						✏️
					</EditButton>
				</CMDBuddyTooltip>

				{/* Command deletion section */}
				{showConfirmDeleteButton ? (
					<CMDBuddyTooltip content="Permanently delete Command">
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
					</CMDBuddyTooltip>
				) : (
					<CMDBuddyTooltip content="Permanently delete Command">
						<DeleteButton
							onClick={(e) => {
								// Stops click from bubbling up and triggering another onClick
								e.stopPropagation();
								setShowConfirmDeleteButton(true);
							}}
						>
							🗑️
						</DeleteButton>
					</CMDBuddyTooltip>
				)}
			</IconContainer>
		</CommandContainer>
	);
};

export default CommandInSideBar;
