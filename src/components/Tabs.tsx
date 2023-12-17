"use client";

// README:
// This displays various Tabs for navigating through the app
// The Commands tab has sub-tabs (/generate, /edit, /create) that appear on hover

import React from "react";
import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";

const TabContainer = styled.div`
	display: flex;
	position: relative; // Set the position to relative for absolute positioning of subtabs
	background: ${({ theme }) => theme.colors.tabBackground};
	padding: 10px 0;
`;

type TabProps = {
	active?: boolean;
};

const Tab = styled.button<TabProps>`
	background: ${({ theme, active }) =>
		active ? theme.colors.activeTabBackground : "transparent"};
	color: ${({ theme }) => theme.colors.text};
	border: none;
	padding: 10px 15px;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.colors.hoverTabBackground};
	}
`;

const SubTabContainer = styled.div`
	display: none;
	position: absolute;
	top: 100%; // Position right below the tab
	left: 0;
	flex-direction: column;
	background: ${({ theme }) => theme.colors.activeTabBackground};
	padding: 5px 0;
	z-index: 10; // Ensure it appears above other content
`;

const CommandsContainer = styled.div`
	&:hover ${SubTabContainer} {
		display: flex;
	}
`;

const SubTab = styled(Tab)`
	padding: 5px 10px;
`;

const Tabs = () => {
	const router = useRouter();
	const theme = useTheme();

	const handleTabClick = (path: string) => {
		router.push(path);
	};

	return (
		<nav>
			<TabContainer>
				<CommandsContainer>
					<Tab>Commands</Tab>
					<SubTabContainer>
						<SubTab onClick={() => handleTabClick("/commands/generate")}>
							Generate
						</SubTab>
						<SubTab onClick={() => handleTabClick("/commands/edit")}>
							Edit
						</SubTab>
						<SubTab onClick={() => handleTabClick("/commands/create")}>
							Create
						</SubTab>
					</SubTabContainer>
				</CommandsContainer>
				<Tab onClick={() => handleTabClick("/about")}>About</Tab>
				<Tab onClick={() => handleTabClick("/login")}>Login</Tab>
			</TabContainer>
		</nav>
	);
};

export default Tabs;
