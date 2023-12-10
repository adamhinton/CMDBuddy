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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { SideBarUtils } from "../../../utils/SidebarUtils";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableProps,
} from "@hello-pangea/dnd";

// Styled components
import { SideBarContainer } from "../../../utils/SidebarUtils";
import CommandInSideBar from "./CommandInSideBar";

const { handleCommandTitlesEditSubmit, handleCommandDelete, handleDnDSave } =
	SideBarUtils;

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
		if (!result.destination) return;

		const items = Array.from(localCommands || []);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setLocalCommands(items);
		setHasChanges(true); // tracks if user is currently changing order of commands with DnD
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
					<button
						onClick={async () =>
							await handleDnDSave(
								localCommands,
								dispatch,
								commands!,
								setHasChanges,
								setLocalCommands
							)
						}
					>
						Save
					</button>
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
											<CommandInSideBar
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
