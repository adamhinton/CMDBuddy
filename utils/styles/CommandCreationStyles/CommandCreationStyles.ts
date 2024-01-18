// README:
// This is the styles page for Command Creation

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

export const CollapsibleBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 300px;
	padding: 10px;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.commandCreation.buttonBackground};
	border-radius: 4px;
	margin-bottom: 5px;
	background-color: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	transition: box-shadow 0.3s ease, background-color 0.3s ease;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1); // subtle shadow for distinction

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandCreation.buttonHoverBackground};
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15); // stronger shadow on hover
	}
`;

export const DragHandle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	font-size: 20px; // icon size
	cursor: grab;

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandCreation.buttonHoverBackground};
	}

	&:active {
		cursor: grabbing;
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
	font-size: 16px; // icon size
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
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
