"use client";

// TODO:
// Edit field shows up, now instate submit logic
// Delete logic
// DnD
// Horizontal issue

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SideBarContainer = styled.div`
	width: 250px;
	/* background-color: ${({ theme }) => theme.sidebarBg}; */
	color: ${({ theme }) => theme.text};
	height: 100vh;
	overflow-y: auto;
	padding: 10px;
`;

const CommandItem = styled.div`
	padding: 10px;
	margin-bottom: 5px;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.commandBg};
	color: ${({ theme }) => theme.commandText};
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.commandHoverBg};
	}
`;

const CommandContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.span`
	flex-grow: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const EditInput = styled.input`
	flex-grow: 1;
	border: none;
	padding: 4px;
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

const Command = ({ title }: { title: string }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);

	return (
		<CommandContainer>
			{isEditing ? (
				<EditInput
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
				/>
			) : (
				<Title>{title}</Title>
			)}
			<EditButton onClick={() => setIsEditing(!isEditing)}>✏️</EditButton>
			<DeleteButton>🗑️</DeleteButton>
		</CommandContainer>
	);
};

const SideBar = () => {
	const commands = useSelector((state: RootState) => state.commands.commands);

	return (
		<SideBarContainer>
			{commands?.map((command, index) => (
				<Command key={index} title={command.title} />
			))}
		</SideBarContainer>
	);
};

export default SideBar;
