/* eslint-disable react/no-unescaped-entities */
"use client";

// README:
// Pretty straightforward About page.
// ToC on the left has headings that, on click, jump user to relevant section
// Has Subtitles and SubSubtitles
// When you change headings, make sure to update in the ToC and add an href to their title

// TODO: Update /about images with new UI

import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import Image from "next/image";

// These two image show command generation UI
import darkModeGenMakeNewPersonIMG from "../../../utils/images/generatemakenewperson-darkmode.png";
import lightModeGenMakeNewPersonIMG from "../../../utils/images/generatemakenewperson-lightmode.png";

// These two images show command creation UI for baseCommand and title
import darkModeCreateBaseCommandTitleIMG from "../../../utils/images/createcommand-basecommandandtitle-darkmode.png";
import lightModeCreateBaseCommandTitleIMG from "../../../utils/images/createcommand-basecommandandtitle-lightmode.png";

// These two images show Parameter creation UI
import lightModePCFIMG from "../../../utils/images/PCF-lightmode.png";
import darkModePCFIMG from "../../../utils/images/PCF-darkmode.png";

import { AboutPageStyles } from "../../../utils/styles/AboutPageStyles";
const {
	AboutPageLayout,
	ContentContainer,
	Title,
	Section,
	SubSubtitle,
	Subtitle,
	Text,
	CodeBlock,
	ImageContainer,
	StyledImage,
} = AboutPageStyles;

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableOfContents, {
	toCHeadings,
} from "@/components/AboutPageComponents/TableOfContents";

const About = () => {
	const isDarkMode = useSelector((state: RootState) => {
		return state.darkMode.isDarkMode;
	});

	return (
		<AboutPageLayout className="aboutPageLayout">
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
									? darkModeCreateBaseCommandTitleIMG
									: lightModeCreateBaseCommandTitleIMG
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

					<SubSubtitle id="Parameter Options Explained">
						Parameter Options Explained
					</SubSubtitle>
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

					<SubSubtitle id="String Parameter">String Parameter</SubSubtitle>
					<ul>
						<li>
							<Text>Parameters whose value will be a string</Text>
						</li>
						<li>
							<Text>Examples: personsName, favoriteFood, location</Text>
						</li>
						<li>
							<Text>
								Customize with options like min/max length, validation regex,
								and default value
							</Text>
						</li>
						<li>
							<Text>Always goes before your base Command</Text>
						</li>
					</ul>

					<SubSubtitle id="Integer Parameter">Integer Parameter</SubSubtitle>
					<ul>
						<li>
							<Text>
								Parameters whose value will be any number (not just a whole
								number)
							</Text>
						</li>
						<li>
							<Text>Examples: age, numDollars, kilometersPerHour</Text>
						</li>
						<li>
							<Text>
								Customize with options like min/max value and default value
							</Text>
						</li>
						<li>
							<Text>Always goes before your base Command</Text>
						</li>
					</ul>

					<SubSubtitle id="Boolean Parameter">Boolean Parameter</SubSubtitle>
					<ul>
						<li>
							<Text>Parameters whose value will be a boolean</Text>
						</li>
						<li>
							<Text>Examples: isEmployed, hasMotorcycle, isEligible</Text>
						</li>
						<li>
							<Text>Customize with default value</Text>
						</li>
						<li>
							<Text>Always goes before your base Command</Text>
						</li>
					</ul>

					<SubSubtitle id="Dropdown Parameter">Dropdown Parameter</SubSubtitle>
					<ul>
						<li>
							<Text>
								Parameters with certain possible values you know ahead of time
							</Text>
						</li>
						<li>
							<Text>
								Enter these values when creating the Command, and you'll select
								from them when generating the Command to copy
							</Text>
						</li>
						<li>
							<Text>
								Examples: lists of authorization types, company departments,
								deployment environments
							</Text>
						</li>
						<li>
							<Text>Customize with default value</Text>
						</li>
						<li>
							<Text>Always goes before your base Command</Text>
						</li>
					</ul>

					<SubSubtitle id="Flag Parameter">Flag Parameter</SubSubtitle>
					<ul>
						<li>
							<Text>Flags that go after your base command.</Text>
						</li>
						<li>
							<Text>Examples: --headed , --save-dev, --use-typescript</Text>
						</li>
						<li>
							<Text>Customize with default value</Text>
						</li>
						<li>
							<Text>Always goes after your base Command</Text>
						</li>
					</ul>
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

					<Text>
						If you made a default value, the parameter will default to that.
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
				</Section>

				<Section id="Use Cases">
					<Subtitle>Use Cases</Subtitle>

					<SubSubtitle id="End To End Testing">End To End Testing</SubSubtitle>
					<Text>
						Many E2E tests requrire complex combinations of variables,
						parameters, data sets and environment configs.
					</Text>

					<SubSubtitle id="CI/CD">CI/CD</SubSubtitle>
					<Text>
						Configure dynamic deployment scripts with parameters like branch
						names, version tags, and deployment environments
					</Text>

					<SubSubtitle id="Automating Routine Tasks">
						Automating Routine Tasks
					</SubSubtitle>
					<Text>
						Store commands for server restarts, clearing caches, updating
						software, and more!
					</Text>
				</Section>
			</ContentContainer>
		</AboutPageLayout>
	);
};
export default About;
