"use client";

import React from "react";
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

const CommandContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.span`
	flex-grow: 1;
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
	return (
		<CommandContainer>
			<Title>{title}</Title>
			<EditButton>✏️</EditButton>
			<DeleteButton>🗑️</DeleteButton>
		</CommandContainer>
	);
};
