// README:
// This is the styles page for Command Creation

import Image from "next/image";
import styled from "styled-components";

export const StyledCCFForm = styled.form`
	background: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 20px;
	border-radius: 8px;
	width: 100%;
`;

export const StyledCommandCreationHeader = styled.h2`
	color: ${({ theme }) => theme.commandCreation.formText};
	margin-top: 0;
`;

export const StyledCommandCreationDisclaimer = styled.p`
	color: ${({ theme }) => theme.commandCreation.formText};
	padding-bottom: 1rem;
	border-bottom: 1px solid white;
`;

export const StyledCommandInputContainer = styled.div`
	display: flex;
	justify-content: center; // or align-items based on your design need
`;

export const CommandInputGroup = styled.section`
	margin-bottom: 2rem; // Separate the command group from the parameters
`;

export const StyledCCFLabel = styled.label`
	width: 200px;
	display: block;
	margin-bottom: 5px;
`;

export const StyledCCFInput = styled.input`
	width: 300px;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const StyledCCFError = styled.p`
	color: ${({ theme }) => theme.commandCreation.errorText};
	margin-bottom: 10px;
`;

export const ParamCreationButtonsContainer = styled.div`
	display: flex;
	margin: 1rem 0;
	justify-content: space-between;
	max-width: 500px;
`;

export const StyledCCFButton = styled.button`
	background: ${({ theme }) => theme.commandCreation.buttonBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

// Enhanced Button styles for visual hierarchy
// This is the "Submit" button.
export const PrimaryButton = styled(StyledCCFButton)`
	font-weight: bold;
	border: 2px solid ${({ theme }) => theme.commandCreation.submitButtonBorder};
	background: ${({ theme }) => theme.commandCreation.submitButtonBackground};
	color: ${({ theme }) => theme.commandCreation.submitButtonText};
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease,
		border-color 0.3s ease;

	&:hover {
		background: ${({ theme }) =>
			theme.commandCreation.submitButtonHoverBackground};
		color: ${({ theme }) => theme.commandCreation.submitButtonHoverText};
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}

	&:disabled {
		background: ${({ theme }) =>
			theme.commandCreation.submitButtonDisabledBackground};
		color: ${({ theme }) => theme.commandCreation.submitButtonDisabledText};
		border-color: ${({ theme }) =>
			theme.commandCreation.submitButtonDisabledBorder};
		box-shadow: none;
		cursor: not-allowed;
	}
`;

export const SecondaryButton = styled(StyledCCFButton)`
	// Maintain the current style for secondary buttons
	// Not sure this empty one is best practices
`;

export const CollapsibleBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 350px;
	padding: 10px;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.commandCreation.buttonBackground};
	border-radius: 4px;
	margin-bottom: 5px;
	background-color: ${({ theme }) =>
		theme.commandCreation.collapsibleBarBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	transition: box-shadow 0.3s ease, background-color 0.3s ease;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandCreation.collapsibleBarHoverBackground};
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15); // stronger shadow on hover
	}
`;

export const DragHandle = styled.div`
	color: ${({ theme }) => theme.commandCreation.inputText};
	cursor: grab; // cursor change to indicate draggability
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

// CollapsibleBar stuff
export const ParameterName = styled.span`
	font-weight: bold;
	color: ${({ theme }) => theme.commandCreation.inputText};
`;

// CollapsibleBar stuff
export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

// Replace placeholders with actual icons for clarity
export const StyledUpDownIcon = styled.i`
	width: 15px;
	height: 15px;
	font-size: 16px;
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;
export const StyledChevronImage = styled(Image)`
	width: 100%;
	height: 100%;
`;

// CollapsibleBar stuff
export const StyledUpPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

// CollapsibleBar stuff
export const StyledTrashIcon = styled.i`
	font-size: 16px; // icon size
	color: ${({ theme }) => theme.commandCreation.errorText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;
