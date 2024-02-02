"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const loggedInUser = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();

	// User needs an account to create/generate commands
	if (!loggedInUser) {
		return (
			<LayoutContainer>
				<h1>Log in to create and generate commands!</h1>
			</LayoutContainer>
		);
	}

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
