"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../redux/store";
import { useRouter } from "next/navigation";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Redirect to login/registration if not logged in
	const loggedInUser = useSelector((state: RootState) => state.auth.user);
	const router = useRouter();
	useEffect(() => {
		if (!loggedInUser) {
			router.push("/login");
		}
	});

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
