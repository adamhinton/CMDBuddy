// README:
// This component shows a preview of the Command you've created. Like it'll show `companyName= zipCode= npx playwright test createCompany --headed`
// It's updated every time a user inputs a value in baseCommand, or a parameter's name or defaultValue.
// NOTE: This is when the user initially CREATING a Command, like when the user fills out a form with parameters' names, baseCommand etc.
// Dynamic Command generation will be another component.

import { AnyParameter } from "../../../utils/CommandCreationUtils";

type LiveCommandPreviewProps = {
	baseCommand: string;
	parameters?: AnyParameter[];
	watch: Function;
};

const LiveCommandPreview = ({
	baseCommand,
	parameters,
	watch,
}: LiveCommandPreviewProps) => {
	// Use watch to get real-time updates of form values
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

	const commandPreview = `${nonFlagParams} ${baseCommand} ${flagParams}`.trim();

	return parameters?.length && <div>{commandPreview}</div>;
};

export default LiveCommandPreview;
