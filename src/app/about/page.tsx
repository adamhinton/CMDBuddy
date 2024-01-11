// README:
// Pretty straightforward About page.
// ToC on the left has headings that, on click, jump user to relevant section
// Has Subtitles and SubSubtitles
// When you change headings, make sure to update in the ToC and add an href to their title

/* eslint-disable react/no-unescaped-entities */
"use client";

// TODO: ToC appears over subtabs
// TODO: Looks funny at small screen sizes
// TODO: Use cases/ideas section
// TODO: List Key features somewhere

import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import styled, { useTheme } from "styled-components";
import Image from "next/image";
// These two image show command generation UI
import darkModeGenMakeNewPersonIMG from "../../../utils/images/generatemakenewperson-darkmode.png";
import lightModeGenMakeNewPersonIMG from "../../../utils/images/generatemakenewperson-lightmode.png";
// These two images show command creation UI for baseCommand and title
import darkModeCreateBaseComandTitleIMG from "../../../utils/images/createcommand-basecommandandtitle-darkmode.png";
import lightModeCreateBaseComandTitleIMG from "../../../utils/images/createcommand-basecommandandtitle-lightmode.png";
// These two images show Parameter creation UI
import lightModePCFIMG from "../../../utils/images/PCF-lightmode.png";
import darkModePCFIMG from "../../../utils/images/PCF-darkmode.png";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const About = () => {
	const isDarkMode = useSelector((state: RootState) => {
		return state.darkMode.isDarkMode;
	});

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
					<ImageContainer>
						<StyledImage
							src={
								isDarkMode
									? darkModeGenMakeNewPersonIMG
									: lightModeGenMakeNewPersonIMG
							}
							alt="Command generation UI. Command is `npx create human` with parameter inputs for personsName, isEmployed, and age"
							// width={200}
							// height={100}
						/>
					</ImageContainer>
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
					<ImageContainer>
						<Image
							src={
								isDarkMode
									? darkModeCreateBaseComandTitleIMG
									: lightModeCreateBaseComandTitleIMG
							}
							alt="Inputs to create a new Command with title and base command"
						/>
					</ImageContainer>
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

					<SubSubtitle id="Parameter Options">Parameter Options</SubSubtitle>
					<Text>
						There are five parameter types available: STRING, INTEGER, BOOLEAN,
						FLAG, and DROPDOWN. Each has different options for validation.
					</Text>
					<ImageContainer>
						<Image
							src={isDarkMode ? darkModePCFIMG : lightModePCFIMG}
							alt="Parameter Creation UI with inputs for Type, Name, Default Value, Optional (checkbox), min/max length, and Validation Regex"
						/>
					</ImageContainer>
					<Text>
						STRING, INTEGER, BOOLEAN, and DROPDOWN parameters precede the base
						command in your generated command.
					</Text>
					<Text>
						FLAG parameters are different; they appear after the base command,
						like `--headed` in test files, or `--template typescript` in
						create-react-app.
					</Text>
					<SubSubtitle id="Further Refinement">Further Refinement</SubSubtitle>
					<Text>
						Customize your Parameters with default values, max/min values, regex
						and more.
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
					<ImageContainer>
						<StyledImage
							src={
								isDarkMode
									? darkModeGenMakeNewPersonIMG
									: lightModeGenMakeNewPersonIMG
							}
							alt="Command generation UI. Command is `npx create human` with parameter inputs for personsName, isEmployed, and age"
						/>
					</ImageContainer>
					<Text>
						If you made a default value, the parameter will default to that.
					</Text>
				</Section>
			</ContentContainer>
		</AboutPageLayout>
	);
};
export default About;

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
const toCHeadings: TOCHeadings = [
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

	li {
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

	// The below parts of StyledTableOfContents is all stuff for ToC Subheadings
	li > ul {
		padding-left: 20px; // Increased indentation for subheadings
	}

	/* Subheadings stuff */
	li > ul > li {
		margin-top: 5px;
	}

	/* Subheadings stuff */
	li > ul > li > a {
		font-weight: normal; // Less emphasis on subheadings
		font-size: 0.85em; // Slightly smaller font size for subheadings
		color: ${({ theme }) => theme.aboutPage.tOCSubHeading}; // Subheading color
		padding-left: 15px; // Further indent subheadings
		padding-top: 3px;
		padding-bottom: 3px;
	}
`;

const SubSubtitle = styled.h3`
	color: ${({ theme }) => theme.aboutPage.subSubtitle};
	margin-top: 20px;
	margin-bottom: 10px;
`;

const ImageContainer = styled.div`
	border: 2px solid ${({ theme }) => theme.aboutPage.imageBorder};
	background-color: ${({ theme }) => theme.aboutPage.imageBackground};
	padding: 10px;
	max-width: 100%;
	height: auto;
	margin-top: 20px;
	margin-bottom: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const StyledImage = styled(Image)`
	width: 100%;
	height: auto;
`;
