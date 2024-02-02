"use client";

// README:
// This displays various Tabs (/commands, /login, /about  )for navigating through the app
// The Commands tab has sub-tabs (/generate, /edit, /create) that appear on hover

import { Amplify } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure({ ...config, ssr: true });

import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const TabContainer = styled.nav`
	display: flex;
	position: relative; // So subtabs appear over the rest of the UI
	background: ${({ theme }) => theme.tabs.background};
	padding: 10px 0;
`;

type TabProps = Readonly<{
	active?: boolean;
}>;

const Tab = styled.button<TabProps>`
	background: ${({ theme, active }) =>
		active ? theme.tabs.activeBackground : "transparent"};
	color: ${({ theme }) => theme.tabs.text};
	border: none;
	padding: 10px 15px;
	cursor: pointer;
	position: relative; // relative positioning to keep hover within this element
	z-index: 1; // Ensure the tab is above the subtab container
	&:hover {
		background: ${({ theme }) => theme.tabs.hoverBackground};
	}
	font-weight: ${({ active }) => (active ? "bold" : "normal")};
	border-bottom: 2px solid;
	${({ theme, active }) => (active ? theme.tabs.activeBorder : "transparent")};
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s, border-bottom-color 0.3s;
`;

// These subtabs appear when you hover over the Commands tab. They show /commands subroutes (create, generate, edit)
// They appear over the rest of the UI
const SubTabContainer = styled.div`
	display: none;
	position: absolute;
	top: 100%; // Position right below the main tab
	left: 0;
	flex-direction: column;
	background: ${({ theme }) => theme.tabs.activeBackground};
	padding: 5px 0;
	z-index: 10; // Sub-Tabs were appearing under the ToC, so I gave them a higher z-index than ToC
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
