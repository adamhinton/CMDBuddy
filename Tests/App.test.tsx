import App from "../src/App";
import { render } from "@testing-library/react";
import React from "react";

test("[1] App starts without errors", () => {
	render(<App></App>);
});
