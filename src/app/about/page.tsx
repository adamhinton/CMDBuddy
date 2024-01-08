"use client";

import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import Link from "next/link";
Amplify.configure({ ...config, ssr: true });
import styled from "styled-components";

const About = () => {
	return (
		<>
			<TableOfContents headings={toCHeadings} />
			<div>
				<h1 id="title">CMDBuddy</h1>
				<section id="Overview">
					<h2>Overview</h2>
					<p>
						I created CMDBuddy because, as a QA Engineer, I found myself typing
						out the same CLI test Commands over and over.
					</p>
					<p>
						It was arduous to input parameter values again and again, so I made
						this tool to generate Commands for me. Now I'm sharing it - free and
						open source forever - with the dev community.
					</p>
					<p>
						Example Command:
						<code>
							npx playwright test createHuman age=25 location={"Philadelphia"}
						</code>
					</p>
					<p>
						CMDBuddy is a simple interface to input values for age and location
						in this command (for example), and copy the generated Command to
						enter in your CLI.
					</p>
					<p>TODO: Image here</p>
				</section>
				<section id="section2">
					<h2>Section 2</h2>
					<p>Your content for Section 2.</p>
				</section>
			</div>
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
		title: "Overview",
	},
];
