/* eslint-disable react/no-unescaped-entities */
"use client";

// TODO: ToC appears over subtabs
// TODO: Looks funny at small screen sizes
// TODO: Sub-subtitles. Like h3 dividing up long sections
// TODO: Use cases/ideas section

import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import styled from "styled-components";

const About = () => {
	return (
		<AboutPageLayout>
			<TableOfContents headings={toCHeadings} />
			<ContentContainer>
				<Title id="title">CMDBuddy</Title>

				<Section id="Overview">
					<Subtitle>Overview</Subtitle>
					<Text>
						I created CMDBuddy because, as a QA Engineer, I repeatedly found
						myself typing out the same CLI test commands over and over.
					</Text>
					<Text>
						CMDBuddy lets you create command templates, entering values for
						their parameters to quickly generate and copy formatted commands.
						For example:
					</Text>
					<CodeBlock>
						age=25 location={"Philadelphia"} npx playwright test createHuman
					</CodeBlock>
					<Text>
						In this user's base command, `npx playwright test createHuman`, they
						enter `25` for age and "Philadelphia" for location and voilà — their
						command is generated. This is particularly useful for complex
						commands with numerous parameters.
					</Text>
					<Text>TODO: Image here</Text>
				</Section>

				<Section id="Getting Started">
					<Subtitle>Getting Started</Subtitle>
					<Text>
						1. <Link href="/login">Create an account or sign in.</Link>
					</Text>
					<Text>
						2. <Link href="/commands/create">Build new commands</Link> with
						custom parameters.
					</Text>
					<Text>
						3. Use your new commands by entering values for their parameters and
						copying the generated command from{" "}
						<Link href="/commands/generate">this page</Link>.
					</Text>
				</Section>

				<Section id="Building your Commands">
					<Subtitle>Building your Commands</Subtitle>
					<Text>
						Assign a <strong>base command</strong>, the command that runs the
						program, and a <strong>title</strong> to identify it in the sidebar.
					</Text>
					<Text>
						Create as many <strong>parameters</strong> as needed for your
						command.
					</Text>
					<Text>
						Parameters are dynamic variables such as `personName` and
						`personAge` in this example:
					</Text>
					<CodeBlock>
						personName="Bob" personAge=25 jest test createPerson
					</CodeBlock>
					<Text>
						`personName` and `personAge` are environment variables in your test
						that you pass in from the CLI.
					</Text>
					<Text>
						There are five parameter types available: STRING, INT, BOOLEAN,
						FLAG, and DROPDOWN.
					</Text>
					<Text>
						STRING, INT, BOOLEAN, and DROPDOWN parameters precede the base
						command in your generated command.
					</Text>
					<Text>
						FLAG parameters are different; they appear after the base command,
						like `--headed` in test files, or `--template typescript` in
						create-react-app.
					</Text>
				</Section>

				<Section id="Generating your commands">
					<Subtitle>Generating your Commands</Subtitle>
					<Text>
						Select your command from the sidebar within the commands section.
					</Text>
					<Text>
						Enter values for each parameter and copy the generated command to
						your terminal. You can also set default values for each parameter.
					</Text>
				</Section>
			</ContentContainer>
		</AboutPageLayout>
	);
};
export default About;

type TableOfContentProps = {
	headings: Headings;
};

type Headings = { title: string }[];

const TableOfContents = (props: TableOfContentProps) => {
	const { headings } = props;
	return (
		<StyledTableOfContents>
			<ul>
				{headings.map((heading) => (
					<li key={heading.title}>
						<Link href={`#${heading.title}`}>{heading.title}</Link>
					</li>
				))}
			</ul>
		</StyledTableOfContents>
	);
};

const toCHeadings: Headings = [
	{
		title: "Overview",
	},
	{
		title: "Getting Started",
	},
	{
		title: "Building your Commands",
	},
	{
		title: "Generating your commands",
	},
	{
		title: "FAQ",
	},
];

const Title = styled.h1`
	color: ${({ theme }) => theme.aboutPage.title};
`;

const Subtitle = styled.h2`
	color: ${({ theme }) => theme.aboutPage.subtitle};
`;

const Text = styled.p`
	color: ${({ theme }) => theme.aboutPage.text};
`;

const CodeBlock = styled.code`
	background-color: ${({ theme }) => theme.aboutPage.codeBlock};
	color: ${({ theme }) => theme.aboutPage.codeText};
	padding: 10px;
	display: block;
	margin: 10px 0;
`;

const AboutPageLayout = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const ContentContainer = styled.div`
	padding: 20px;
	flex-grow: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
	margin-bottom: 30px;
`;

const StyledTableOfContents = styled.nav`
	flex: 0 0 200px;
	max-height: 100vh;
	overflow-y: auto; // scroll on overflow
	position: sticky;
	top: 0; // stick to the top of the viewport
	background-color: ${({ theme }) => theme.sidebar.background};
	color: ${({ theme }) => theme.sidebar.text};
	padding: 20px;
	margin-right: 20px; // space between ToC and content
	border-right: 2px solid ${({ theme }) => theme.sidebar.dividerColor};

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li + li {
		margin-top: 10px;
	}

	a {
		color: ${({ theme }) => theme.sidebar.text};
		text-decoration: none;
		font-weight: bold;
		display: block;
		padding: 5px 10px;
		border-radius: 5px;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${({ theme }) => theme.sidebar.hoverBackground};
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.text};
		}
	}
`;
