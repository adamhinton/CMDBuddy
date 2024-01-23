"use client";

// README:
// This component shows a preview of the Command you've created (or edited). Like it'll show `companyName= zipCode= npx playwright test createCompany --headed`
// It's updated every time a user inputs a value in baseCommand, or a parameter's name or defaultValue.
// NOTE: This is when the user initially CREATING a Command, like when the user fills out a form with parameters' names, baseCommand etc.
// Dynamic Command generation goes in LiveCommandExecutionPreview.tsx. These files produce much the same UI, but the methods to achieve that are different enough that I made two components.
// STYLING:
// -- Since the UI is much the same, styling is shared between this and LiveCommandExecutionPreview.tsx

import { UseFormWatch } from "react-hook-form";
import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import { CMDBuddyCommandFormValidation } from "./CommandCreationOrEditForm";
import { CommandPreviewContainer } from "../CommandExecutionComponents/LiveCommandExecutionPreview";

type LiveCommandPreviewProps = {
	watch: UseFormWatch<CMDBuddyCommandFormValidation>;
};

const LiveCommandPreview = ({ watch }: LiveCommandPreviewProps) => {
	// Use watch to get real-time updates of form values
	const watchedBaseCommand = watch("baseCommand");
	const watchedParameters = watch("parameters");

	// Build the command preview
	let nonFlagParams = "";
	let flagParams = "";

	watchedParameters?.forEach((param: AnyParameter) => {
		if (param.type === "FLAG") {
			param.name && (flagParams += ` ${param.name}`);
		} else {
			param.name &&
				(nonFlagParams += `${param.name}=${param.defaultValue || " "}`);
		}
	});

	const commandPreview =
		`${nonFlagParams} ${watchedBaseCommand} ${flagParams}`.trim();

	return (
		<CommandPreviewContainer>
			<code>{commandPreview}</code>
		</CommandPreviewContainer>
	);
};

export default LiveCommandPreview;
