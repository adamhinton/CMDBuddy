import styled from "styled-components";
import Image from "next/image";

const Title = styled.h1`
	color: ${({ theme }) => theme.aboutPage.title};
`;

const Subtitle = styled.h2`
	color: ${({ theme }) => theme.aboutPage.subtitle};
	padding-top: 10px;
	border-top: 1px solid ${({ theme }) => theme.aboutPage.borderColor};
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
	max-width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	/* @media (max-width: 768px) {
		flex-direction: column;
	} */
	a {
		color: green;
	}
`;

const ContentContainer = styled.div`
	padding: 20px;
	flex-grow: 1;
	background-color: ${({ theme }) => theme.colors.background};

	@media (max-width: 768px) {
		padding: 10px;
	}
`;

const Section = styled.section`
	margin-bottom: 70px;
`;

const StyledTableOfContents = styled.nav`
	flex: 0 0 200px;
	z-index: 1; // Sub-Tabs were appearing under the ToC, so I gave them a higher z-index than ToC
	max-height: 100vh;
	overflow-y: auto; // scroll on overflow
	position: sticky;
	top: 0; // stick to the top of the viewport
	background-color: ${({ theme }) => theme.sidebar.background};
	color: ${({ theme }) => theme.sidebar.text};
	padding: 20px;
	margin-right: 20px; // space between ToC and content
	border-right: 2px solid ${({ theme }) => theme.sidebar.dividerColor};

	@media (max-width: 768px) {
		position: relative;
		margin-right: 10px;
		width: 175px;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		margin-top: 8px;
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
		font-weight: normal;
		font-size: 0.85em;
		color: ${({ theme }) => theme.aboutPage.tOCSubHeading};
		padding-left: 15px; // Indent subheadings
		padding-top: 3px;
		padding-bottom: 3px;
	}
`;

const SubSubtitle = styled.h3`
	color: ${({ theme }) => theme.aboutPage.subSubtitle};
	margin-top: 30px;
	margin-bottom: 20px;
	padding-top: 10px;
	border-top: 1px dotted ${({ theme }) => theme.aboutPage.borderColor};
`;

const ImageContainer = styled.div`
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
	border: 2px solid ${({ theme }) => theme.aboutPage.imageBorder};
	max-width: 100%;
	height: auto;
`;

export const AboutPageStyles = {
	Title,
	Subtitle,
	Text,
	CodeBlock,
	AboutPageLayout,
	ContentContainer,
	Section,
	StyledTableOfContents,
	SubSubtitle,
	ImageContainer,
	StyledImage,
};
