"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
	const isDarkMode = useSelector(
		(state: RootState) => state.darkMode.isDarkMode
	);

	console.log("isDarkMode in Header:", isDarkMode);

	return <header>Header</header>;
};

export default Header;
