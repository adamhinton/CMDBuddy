"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsDarkMode } from "../../redux/slices/darkModeSlice";
import { useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import {
	setDarkModeLocalStorage,
	toggleUserDarkModeInDB,
} from "../../utils/darkModeUtils";
import styled from "styled-components";

const Header = () => {
	const userID = useSelector((state: RootState) => state.auth.user?.id);
	const dispatch = useDispatch();

	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	const isLoggedIn = useSelector((state: RootState) => {
		return state.auth.user ? true : false;
	});

	const darkModeOnClick = async (
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const newDarkModeValue = !isDarkMode;
		dispatch(setIsDarkMode(newDarkModeValue));

		// USER NOT LOGGED IN
		if (!isLoggedIn) {
			setDarkModeLocalStorage(newDarkModeValue);
		}
		// USER IS LOGGED IN
		else {
			// Update User in db with new darkMode value
			await toggleUserDarkModeInDB(userID!, newDarkModeValue);
		}
	};

	return (
		<StyledHeader>
			<TitleContainer>
				<Title>CMDBuddy</Title>
				<SubTitle>by Adam Hinton</SubTitle>
			</TitleContainer>
			<Nav>
				<StyledLink
					href="https://github.com/adamhinton/CMDBuddy"
					target="_blank"
				>
					Source
				</StyledLink>
				<StyledLink
					href="https://www.linkedin.com/in/adam-hinton/"
					target="_blank"
				>
					LinkedIn
				</StyledLink>
				<StyledLink
					href="https://master.dorqegfj1nrtm.amplifyapp.com/"
					target="_blank"
				>
					Risk BattleOdds Calculator
				</StyledLink>
			</Nav>
			<DarkModeToggle onClick={(e) => darkModeOnClick(e)}>
				{isDarkMode ? "🌞" : "🌜"}
			</DarkModeToggle>
		</StyledHeader>
	);
};

export default Header;

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background-color: ${({ theme }) => theme.header.background};
	color: ${({ theme }) => theme.header.text};
`;

const TitleContainer = styled.div``;

const Title = styled.h1`
	margin: 0;
	font-size: 1.5rem;
`;

const SubTitle = styled.h2`
	margin: 0;
	font-size: 1rem;
`;

const Nav = styled.nav`
	display: flex;
	gap: 1rem;
`;

/**This is used in both PCEF and Header because I'm lazy, make sure you look at both before messing with this */
export const StyledLink = styled.a`
	color: ${({ theme }) => theme.header.link};
	text-decoration: underline;
	&:hover {
		text-decoration: underline;
	}
`;

const DarkModeToggle = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.header.toggleIcon};
	cursor: pointer;
	font-size: 1.5rem;
`;
