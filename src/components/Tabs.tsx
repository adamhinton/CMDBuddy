"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";

const TabContainer = styled.div`
	display: flex;
	background: ${({ theme }) => theme.colors.tabBackground};
	padding: 10px 0;
`;

// Define a type for the custom props
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
	flex-direction: column;
	background: ${({ theme }) => theme.colors.activeTabBackground};
	padding: 5px 0;
	margin-top: 5px;
`;

const CommandsTab = styled(Tab)`
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
				<CommandsTab>
					Commands
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
				</CommandsTab>
				<Tab onClick={() => handleTabClick("/about")}>About</Tab>
				<Tab onClick={() => handleTabClick("/login")}>Login</Tab>
			</TabContainer>
		</nav>
	);
};

export default Tabs;
