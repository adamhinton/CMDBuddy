import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure({ ...config, ssr: true });

const About = () => {
	return <h1>Placeholder: About Page</h1>;
};

export default About;

type TableOfContentProps = [{ title: string }];
const TableOfContents = (headings: TableOfContentProps) => {
	return (
		<nav>
			<ul>
				{headings.map((heading) => (
					<li key={heading.title}>
						<a href={`#${heading.title}`}>{heading.title}</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

const headings: TableOfContentProps = [
	{
		title: "Mission Statement",
	},
];
