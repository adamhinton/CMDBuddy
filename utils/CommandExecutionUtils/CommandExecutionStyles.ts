// README:
// Styles for CommandExecutionForm and ParameterExecutionForm

import styled from "styled-components";

const CEFForm = styled.form`
	background: ${({ theme }) => theme.commandGeneration.baseBackground};
	color: ${({ theme }) => theme.commandGeneration.baseText};
	max-width: 1200px;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
`;

const CEFHeader = styled.header`
	padding-bottom: 0.3rem;
	border-bottom: 2px solid ${({ theme }) => theme.commandGeneration.baseText};
	margin-bottom: 1rem;
`;

const CEFCommandTitle = styled.h3`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.commandGeneration.baseText};
	margin: 0.5rem 0;
`;

// Error container that will hold multiple error messages
// Will have a maximum of three ErrorItems
const ErrorContainer = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0 0 1rem 0;
	max-height: 100px;
	overflow-y: auto; // Allows scrolling if there are more errors than can be displayed
	background-color: ${({ theme }) => theme.commandGeneration.errorBackground};
`;

// Individual error message styling
// Up to three of these at a time will be in Error Container
const ErrorItem = styled.li`
	color: ${({ theme }) => theme.commandGeneration.errorTextColor};
	background-color: ${({ theme }) =>
		theme.commandGeneration.errorItemBackground};
	border-left: 4px solid
		${({ theme }) => theme.commandGeneration.errorBorderLeftColor};
	padding: 0.5rem;
	margin-bottom: 0.5rem; // Gives space between individual errors
`;

type CEFTextInputProps = {
	inputtype: "STRING" | "INT" | "OTHER";
	hasError?: boolean; // Optional boolean prop to indicate error state
};

const CEFInput = styled.input<CEFTextInputProps>`
	max-width: 250px;
	padding: 0.5rem;
	width: ${(props) =>
		props.inputtype === "STRING"
			? "250px"
			: props.inputtype === "INT"
			? "100px"
			: null};
	margin: 0.75rem 1rem;
	box-sizing: border-box;
	border: 1px solid ${({ theme }) => theme.commandGeneration.inputText};
	border-radius: 4px;
	background: ${({ theme, hasError }) =>
		hasError
			? "red"
			: theme.commandGeneration
					.inputBackground}; // Change background to red if there is an error
	color: ${({ theme }) => theme.colors.text};
`;

const CEFLabel = styled.label`
	font-weight: bold;
	display: flex;
	align-items: center;
	margin-left: 10px;
	margin-right: 3px;
	margin-bottom: 0.25rem;
`;

const CEFButton = styled.button`
	background: ${({ theme }) => theme.commandGeneration.buttonBackground};
	color: ${({ theme }) => theme.commandGeneration.baseText};
	padding: 0.5rem 0.75rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background: ${({ theme }) => theme.commandGeneration.buttonHoverBackground};
	}
`;

const CEFSelect = styled.select`
	width: 150px;
	padding: 0.5rem;
	margin: 0.5rem 0;
	border: 1px solid ${({ theme }) => theme.commandGeneration.inputText};
	border-radius: 4px;
	background: ${({ theme }) => theme.commandGeneration.selectBackground};
	color: ${({ theme }) => theme.commandGeneration.selectText};
`;

const CEFOption = styled.option`
	padding: 0.5rem;
	background: ${({ theme }) => theme.colors.background};
	color: ${({ theme }) => theme.colors.text};
`;

const CEFParametersContainer = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 20px;
`;

// Pass in optional validation error
// If there's an error we do additional styling to make that clear
// React is making me spell haserror all lower case for some reason
const PEFContainer = styled.div<{ haserror?: boolean }>`
	display: flex;
	flex-direction: row;
	max-width: 400px;
	background: ${({ theme, haserror }) =>
		haserror
			? "rgba(255, 0, 0, 0.1)"
			: theme.commandGeneration.inputBackground};
	padding: 0.2rem;
	border-radius: 4px;
	margin-bottom: 0.75rem;
	border: ${({ theme, haserror }) =>
		haserror ? "2px solid red" : `1px solid ${theme.colors.text}`};
	transition: box-shadow 0.3s ease, border 0.3s ease, background-color 0.3s ease;

	&:hover {
		box-shadow: ${({ haserror }) =>
			haserror ? "0 0 10px red" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
	}
`;
const FlagOrBooleanPEFLabel = styled.div`
	display: flex;
	align-items: center;
	margin-right: 1rem;
`;

const CEFStyles = {
	CEFForm,
	CEFHeader,
	CEFCommandTitle,
	ErrorContainer,
	ErrorItem,
	CEFButton,
	CEFInput,
	CEFLabel,
	CEFOption,
	CEFSelect,
	PEFContainer,
	FlagOrBooleanPEFLabel,
	CEFParametersContainer,
};

export default CEFStyles;
