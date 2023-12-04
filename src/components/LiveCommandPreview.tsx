import { AnyParameter } from "../../utils/CommandCreationUtils";

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
	console.log("watchedParameters:", watchedParameters);

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
