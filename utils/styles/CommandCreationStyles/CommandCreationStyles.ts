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
	justify-content: center;
`;

export const CommandInputGroup = styled.section`
	margin-bottom: 2rem;
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

/**Submit button gets enhanced styling here */
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

/**Toolbar that user can click to collapse/expand certain UI.
 *
 * Can contain trash icons, parameter names etc etc
 *
 * Note, this is used in both CommandExecutionForm and CommandCreationForm; make sure you look at both before messing with this.
 */
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

/**Icon that the user grabs to Drag and Drop */
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

export const StyledGeneralIcon = styled.i`
	width: 15px;
	height: 15px;
	font-size: 16px;
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

// React requires this to be a string, and lower case
type StyledIconImageProps = {
	iscollapsed?: "true" | "false";
};

/**This can be a collapse icon. If so, pass in isCollapsed - if it's collapsed, the chevron points up.
 *
 * It can also be other kinds of icon which shouldn't be rotated, in which case don't pass in isCollapsed. */
export const StyledIconImage = styled(Image)<StyledIconImageProps>`
	width: 100%;
	height: 100%;
	/* Turn the chevron upside down if UI is collapsed */
	rotate: ${({ iscollapsed }) => (iscollapsed === "false" ? "180deg	" : "none")};
`;

// CollapsibleBar stuff
/**General purpose container for icons. Put the icon in an <Image> tag within this. */
export const StyledIcon = styled.span`
	font-size: 16px; // icon size
	color: ${({ theme }) => theme.commandCreation.errorText};
	&:hover {
		color: ${({ theme }) => theme.commandCreation.buttonHoverBackground};
	}
`;

// All this Tag stuff is PCEF dropdown utils
// Each Tag is a user-inputted allowed item for dropdwon
export const TagInputContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: ${({ theme }) =>
		theme.commandCreation.dropdownBackgroundColor};
	border: 1px solid ${({ theme }) => theme.commandCreation.dropdownBorderColor};
	padding: 5px;
	border-radius: 5px;
`;

// Dropdown stuff
/**A single item the user has inputted as a Dropdown value.
 *
 * User hits Enter to confirm item; it'll show as a tag with an X to delete.
 */
export const Tag = styled.span`
	padding: 5px 8px;
	background-color: ${({ theme }) =>
		theme.commandCreation.dropdownTagBackgroundColor};
	color: ${({ theme }) => theme.commandCreation.dropdownTagTextColor};
	margin: 2px;
	border-radius: 3px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

// Dropdown stuff
export const RemoveTagIcon = styled.span`
	cursor: pointer;
	color: ${({ theme }) => theme.commandCreation.dropdownTagRemoveIconColor};
`;

// Dropdown stuff
export const TagInput = styled.input`
	flex: 1;
	border: none;
	outline: none;
	padding: 5px;
	color: ${({ theme }) => theme.commandCreation.dropdownTextColor};
	background: transparent;
`;
