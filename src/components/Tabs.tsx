"use client";

// README:
// This displays various Tabs (/commands, /login, /about  )for navigating through the app
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
	position: relative; // relative positioning to keep hover within this element
	z-index: 1; // Ensure the tab is above the subtab container
	&:hover {
		background: ${({ theme }) => theme.colors.hoverTabBackground};
	}
`;

// These subtabs appear when you hover over the Commands tab. They show /commands subroutes (create, generate, edit)
// They appear over the rest of the UI
const SubTabContainer = styled.div`
	display: none;
	position: absolute;
	top: 100%; // Position right below the main tab
	left: 0;
	flex-direction: column;
	background: ${({ theme }) => theme.colors.activeTabBackground};
	padding: 5px 0;
	z-index: 0; // Position the subtabs below the main tabs
`;

// This contains the Commands tab, which has sub-tabs on hover so needs extra styling
const CommandsContainer = styled.div`
	position: relative;
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
				{/* This contains the Commands tab, which has sub-tabs on hover so needs
				extra styling */}
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
