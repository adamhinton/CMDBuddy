import { AnyParameter } from "../../utils/CommandCreationUtils";
import { useEffect, useState } from "react";

type LiveCommandPreviewProps = {
	baseCommand: string;
	parameters?: AnyParameter[];
};

const LiveCommandPreview = ({
	baseCommand,
	parameters,
}: LiveCommandPreviewProps) => {
	const [nonFlagParams, setNonFlagParams] = useState("");
	const [flagParams, setFlagParams] = useState("");

	useEffect(() => {
		let tempNonFlag = "";
		let tempFlag = "";

		parameters?.forEach((param) => {
			// Check the type of parameter
			if (param.type === "FLAG") {
				// Append to flag string
				param.name && (tempFlag += ` ${param.name}`);
			} else {
				// Append to non-flag string
				param.name &&
					(tempNonFlag += `${param.name}=${param.defaultValue || " "}`);
			}
		});

		setNonFlagParams(tempNonFlag);
		setFlagParams(tempFlag);
	}, [parameters, baseCommand]);

	// Concatenate parts to form the command
	const commandPreview = `${nonFlagParams} ${baseCommand} ${flagParams}`.trim();

	return parameters?.length && <div>{commandPreview}</div>;
};

export default LiveCommandPreview;
