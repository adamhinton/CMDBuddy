import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface CMDBuddyTooltipProps {
	content: string;
	children: React.ReactElement;
}

/**Custom container of tooltip; just pass in `content` string of your tooltip text */
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
							offset: [0, 10],
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
