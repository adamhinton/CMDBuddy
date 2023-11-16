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

const Header = () => {
	const userID = useSelector((state: RootState) => state.auth.user?.id);
	console.log("userID in Header:", userID);
	const dispatch = useDispatch();

	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	console.log("isDarkMode in Header:", isDarkMode);

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
		<header>
			<h2>Header</h2>
			<button onClick={(e) => darkModeOnClick(e)}>Toggle Dark mode</button>
		</header>
	);
};

export default Header;
