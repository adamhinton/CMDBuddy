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
				title: "Parameter Options",
			},
			{
				title: "Further Refinement",
			},
		],
	},
	{
		title: "Generating your commands",
	},
	{
		title: "FAQ",
	},
];

export default TableOfContents;
