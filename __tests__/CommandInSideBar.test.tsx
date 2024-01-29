// TODO Tests: Create mock store, wrap tested components in Provider with store
// https://redux.js.org/usage/writing-tests

import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import * as nextRouter from "next/navigation";
import CommandInSideBar from "@/components/SideBar/CommandInSideBar";
import { renderWithProviders } from "./testutils/testReduxStore";
import { CMDBuddyCommand } from "../utils/zod/CommandSchema";

const dragHandleProps = jest.fn();

// Mock Next.js router
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

// Mock utility functions if needed

describe("CommandInSideBar Component", () => {
	beforeEach(() => {
		// Mock router functionalities
		// nextRouter.useRouter.mockImplementation(() => ({
		// 	push: jest.fn(),
		// }));
		// Reset any mocks if needed
	});

	it("renders without crashing", () => {
		renderWithProviders(
			<CommandInSideBar
				command={fakeCommand}
				dragHandleProps={dragHandleProps}
			/>
		);

		// Assertions to check if the component renders
	});

	// Add more tests for different functionalities
	// For example, testing if clicking the edit button calls the right function
});

const fakeCommand: CMDBuddyCommand = {
	id: "1231312",
	baseCommand: "npx test",
	title: "mytitle",
	order: 1,
	userID: "329424",
	parameters: [],
};
