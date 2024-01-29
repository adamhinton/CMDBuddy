import styled from "styled-components";

export const ParameterCreationFormContainer = styled.div`
	border: 2px solid #007bff;
	border-radius: 8px;
	max-width: 900px;
	background: ${({ theme }) => theme.commandCreation.PCEFBackground};
	color: ${({ theme }) => theme.commandCreation.PCEFColor};
	box-shadow: ${({ theme }) => theme.commandCreation.PCEFBoxShadow};
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 8px;
`;

export const ParameterCreationLabel = styled.label`
	display: block;
	margin-bottom: 5px;
	max-width: 130px;
	margin-right: 5px;
`;

export const ParameterCreationInput = styled.input`
	box-shadow: ${({ theme }) => theme.commandCreation.PCEFBoxShadow};
	max-width: 100%;
	display: block;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-right: 20px;
`;

export const ParameterCreationError = styled.p`
	color: ${({ theme }) => theme.commandCreation.errorText};
	margin-bottom: 10px;
`;

export const ParameterCreationSelect = styled.select`
	width: 120px;
	padding: 8px;
	margin-bottom: 10px;
	background: ${({ theme }) => theme.commandCreation.inputBackground};
	color: ${({ theme }) => theme.commandCreation.inputText};
	border: 1px solid #ccc;
	border-radius: 4px;
`;

export const ParameterCreationButton = styled.button`
	margin: 15px 0;
	background: ${({ theme }) => theme.commandCreation.buttonBackground};
	color: ${({ theme }) => theme.commandCreation.formText};
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
	display: block;
`;

export const StyledPCFNameInput = styled(ParameterCreationInput)`
	width: 200px;
	margin-right: 10px;
`;

export const StyledPCFDefaultValueInput = styled(ParameterCreationInput)`
	width: 40%;
	margin-right: 10px;
`;

export const StyledPCFOptionalCheckbox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 9px 0;
`;

export const StyledPCFLengthInput = styled(ParameterCreationInput)`
	max-width: 105px;
	margin-right: 10px;
`;

export const StyledPCFRadioInputContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	margin-right: 10px;
`;

export const StyledPCFBooleanOptions = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100px;
`;

// Handling multiple inputs on the same line for min/max values
export const StyledPCFMinMaxContainer = styled.div`
	display: flex;
	align-items: center;
	max-width: 100%;
`;
