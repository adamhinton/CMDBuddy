// README
// This is the table of contents in /about/page.tsx
// Each heading has a link to the corresponding section of the ToC, clicking it will jump you there.

import Link from "next/link";
import { AboutPageStyles } from "../../../utils/styles/AboutPageStyles";
const { StyledTableOfContents } = AboutPageStyles;

type TableOfContentProps = {
	headings: TOCHeadings;
};

type TOCHeading = {
	title: string;
	subHeadings?: TOCSubHeading[];
};

type TOCSubHeading = {
	title: string;
};

type TOCHeadings = TOCHeading[];

// Table of contents on left of page where user can click headings and be taken to that heading
const TableOfContents = ({ headings }: TableOfContentProps) => {
	return (
		<StyledTableOfContents>
			<ul>
				{headings.map((heading) => (
					<li key={heading.title}>
						<Link href={`#${heading.title}`}>{heading.title}</Link>
						{heading.subHeadings && (
							<ul>
								{heading.subHeadings.map((subHeading) => (
									<li key={subHeading.title}>
										<Link href={`#${subHeading.title}`}>
											{subHeading.title}
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</StyledTableOfContents>
	);
};
export const toCHeadings: TOCHeadings = [
	{
		title: "Overview",
	},
	{
		title: "Getting Started",
	},
	{
		title: "Building your Commands",
		subHeadings: [
			{
				title: "Parameter Options Explained",
			},
			{
				title: "String Parameter",
			},
			{
				title: "Integer Parameter",
			},
			{
				title: "Boolean Parameter",
			},
			{
				title: "Dropdown Parameter",
			},
			{
				title: "Flag Parameter",
			},
		],
	},
	{
		title: "Generating your commands",
	},
	{
		title: "Use Cases",
		subHeadings: [
			{
				title: "End To End Testing",
			},
			{
				title: "CI/CD",
			},
			{ title: "Automating Routine Tasks" },
		],
	},
];

export default TableOfContents;
