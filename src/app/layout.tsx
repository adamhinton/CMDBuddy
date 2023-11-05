import { Amplify } from "aws-amplify";
import { Providers } from "../../redux/provider";
import AuthClientComponent from "../components/Auth.client";
import config from "../aws-exports";
import Header from "../components/Header";
Amplify.configure({ config, ssr: true });
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../utils/styles/themes";

export const metadata = {
	title: "Next.js",
	description: "Generated by Next.js",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<AuthClientComponent />
					<ThemeProvider theme={lightTheme}>
						<Header />
						{children}
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
