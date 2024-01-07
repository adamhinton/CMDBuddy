import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface CMDBuddyTooltipProps {
	content: string;
	children: React.ReactElement;
}

const CMDBuddyTooltip: React.FC<CMDBuddyTooltipProps> = ({
	content,
	children,
}) => {
	return (
		<Tippy
			content={content}
			placement="top"
			popperOptions={{
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [0, 10], // Adjust x and y offsets as needed
						},
					},
				],
			}}
		>
			{children}
		</Tippy>
	);
};

export default CMDBuddyTooltip;
