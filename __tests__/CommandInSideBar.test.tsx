import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import * as nextRouter from "next/navigation";
import CommandInSideBar from "@/components/SideBar/CommandInSideBar";

// Mock Next.js router
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

// Mock utility functions if needed

describe("CommandInSideBar Component", () => {
	beforeEach(() => {
		// Mock router functionalities
		nextRouter.useRouter.mockImplementation(() => ({
			push: jest.fn(),
		}));

		// Reset any mocks if needed
	});

	it("renders without crashing", () => {
		render(
			<Provider store={store}>
				<CommandInSideBar /* pass required props here */ />
			</Provider>
		);

		// Assertions to check if the component renders
	});

	// Add more tests for different functionalities
	// For example, testing if clicking the edit button calls the right function
});
