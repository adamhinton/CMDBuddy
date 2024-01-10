"use client";

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
						I created CMDBuddy because, as a QA Engineer, I found myself typing
						out the same CLI test Commands over and over.
					</Text>
					<CodeBlock>
						age=25 location={"Philadelphia"} npx playwright test createHuman
					</CodeBlock>
					<Text>TODO: Image here</Text>
				</Section>
				<Section id="Getting Started">
					<Subtitle>Getting Started</Subtitle>
					<Text>
						1. Create an account or sign in <Link href="login">here</Link>
					</Text>
					<Text>
						2. Build new Commands - complete with custom parameters -{" "}
						<Link href="commands/generate">here</Link> (commands/create)
					</Text>
					<Text>
						3. Whenever you need to use your new Commands, enter values for
						their Parameters and copy the generated Command{" "}
						<Link href="commands/generate">Here</Link> (commands/generate)
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
		title: "Building your commands",
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
