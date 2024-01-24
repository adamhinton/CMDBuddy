// README:
// We show preview of generated CLI commands in two places: LiveCommandCreationPreview (LCCP) and LiveCommandExecutionPreview (LCEP)
// The UI for these is very similar so they share the CommandPreviewContainer
// The CopyButton component is only used in LCEP

import styled from "styled-components";

// NOTE: See Readme. This component is used in two different files to do the same thing.
/**Displays a preview of the generated CLI command.
 *
 * Put the generated command in < code > html tags within this component. */
export const CommandPreviewContainer = styled.section<{ isVisible: boolean }>`
	opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
	visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
	transition: opacity 0.5s, visibility 0.5s;
	padding: 10px;
	margin: 10px 0;
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.commandPreview.boxShadow};
	background-color: ${({ theme }) => theme.commandPreview.background};
	color: ${({ theme }) => theme.commandPreview.text};
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	font-family: "Courier New", Courier, monospace;
	white-space: pre-wrap; // Ensures command wraps and maintains formatting
	overflow-x: auto; // Adds horizontal scrolling if command is too long

	& > code {
		display: block; // Makes the <code> fill the container
	}
`;

// Unlike CommandPreviewContainer, this button is only used in LiveCommandExecutionPreview.tsx
/**Button to copy genetated CLI command to clipboard. */
export const CopyButton = styled.button`
	cursor: pointer;
	border: none;
	background-color: ${({ theme }) => theme.commandPreview.buttonBackground};
	color: ${({ theme }) => theme.commandPreview.buttonText};
	width: 30px;
	height: 30px;
	padding: 5px; // Padding to shrink the clickable area a bit
	border-radius: 5px; // Rounded corners for modern look
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box; // Ensures padding doesn't affect the final size

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandPreview.buttonHoverBackground};
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px ${({ theme }) => theme.commandPreview.focusShadow};
	}
`;
