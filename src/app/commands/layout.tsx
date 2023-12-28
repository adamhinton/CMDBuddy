"use client";

import SideBar from "@/components/SideBar/SideBar";
import Link from "next/link";
import styled from "styled-components";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LayoutContainer>
			<SideBar />
			{children}
		</LayoutContainer>
	);
}

const LayoutContainer = styled.div`
	display: flex;
`;
