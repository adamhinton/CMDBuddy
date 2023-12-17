"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";

const TabContainer = styled.div`
	display: flex;
	background: ${({ theme }) => theme.colors.tabBackground};
	padding: 10px 0;
`;

const Tab = styled.button`
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
	display: flex;
	background: ${({ theme }) => theme.colors.activeTabBackground};
	padding: 5px 0;
	margin-top: 5px;
`;

const SubTab = styled(Tab)`
	padding: 5px 10px;
`;

const Tabs = () => {
	const [activeTab, setActiveTab] = useState("/");
	const router = useRouter();
	const theme = useTheme();

	const handleTabClick = (path: string) => {
		router.push(path);
		setActiveTab(path);
	};

	return (
		<nav>
			<TabContainer>
				<Tab
					onClick={() => handleTabClick("/commands")}
					active={activeTab === "/commands"}
				>
					Commands
				</Tab>
				<Tab
					onClick={() => handleTabClick("/about")}
					active={activeTab === "/about"}
				>
					About
				</Tab>
				<Tab
					onClick={() => handleTabClick("/login")}
					active={activeTab === "/login"}
				>
					Login
				</Tab>
			</TabContainer>
			{activeTab === "/commands" && (
				<SubTabContainer>
					<SubTab onClick={() => handleTabClick("/commands/generate")}>
						Generate
					</SubTab>
					<SubTab onClick={() => handleTabClick("/commands/edit")}>Edit</SubTab>
					<SubTab onClick={() => handleTabClick("/commands/create")}>
						Create
					</SubTab>
				</SubTabContainer>
			)}
		</nav>
	);
};

export default Tabs;
