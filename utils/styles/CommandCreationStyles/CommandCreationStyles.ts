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

export const StyledCCFLabel = styled.label`
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
	padding: 10px;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.commandCreation.buttonBackground};
	border-radius: 4px;
	margin-bottom: 5px;
	background-color: ${({ theme }) => theme.commandCreation.formBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) =>
			theme.commandCreation.buttonHoverBackground};
	}
`;

export const ParameterName = styled.span`
	font-weight: bold;
	color: ${({ theme }) => theme.commandCreation.inputText};
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px; // Distance between icons
`;

export const StyledDownPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

export const StyledUpPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.formText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

export const StyledTrashPlaceholder = styled.span`
	color: ${({ theme }) => theme.commandCreation.errorText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;
