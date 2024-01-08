import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });

const About = () => {
	return (
		<>
			<TableOfContents headings={toCHeadings} />;
			<p id="Mission Statement">Misison Statement</p>
		</>
	);
};

export default About;

type TableOfContentProps = {
	headings: Headings;
};

type Headings = [{ title: string }];

const TableOfContents = (props: TableOfContentProps) => {
	const { headings } = props;
	return (
		<nav>
			<ul>
				{headings.map((heading) => (
					<li key={heading.title}>
						<Link href={`#${heading.title}`}>{heading.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

const toCHeadings: Headings = [
	{
		title: "Mission Statement",
	},
];
