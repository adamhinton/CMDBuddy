"use client";

import { UseFormWatch } from "react-hook-form";
// README:
// This component shows a preview of the Command you've created (or edited). Like it'll show `companyName= zipCode= npx playwright test createCompany --headed`
// It's updated every time a user inputs a value in baseCommand, or a parameter's name or defaultValue.
// NOTE: This is when the user initially CREATING a Command, like when the user fills out a form with parameters' names, baseCommand etc.
// Dynamic Command generation will be another component.

// TODO:
// Updating baseCommand in the form doesn't immediately change baseCommand here; iy only updates when you change a parameter.

import { AnyParameter } from "../../../utils/CommandCreationUtils/CommandCreationTypes";
import { CMDBuddyCommandFormValidation } from "./CommandCreationOrEditForm";

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
		<section>
			<code>{commandPreview}</code>
		</section>
	);
};

export default LiveCommandPreview;
