"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsDarkMode } from "../../redux/slices/darkModeSlice";
import { useDispatch } from "react-redux";
import { SyntheticEvent } from "react";

const Header = () => {
	const dispatch = useDispatch();

	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	const darkModeOnClick = (
		e: SyntheticEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		dispatch(setIsDarkMode(!isDarkMode));
	};

	return (
		<header>
			<h2>Header</h2>
			<button onClick={(e) => darkModeOnClick(e)}>Toggle Dark mode</button>
		</header>
	);
};

export default Header;
