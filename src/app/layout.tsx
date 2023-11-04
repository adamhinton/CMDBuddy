import { Amplify } from "aws-amplify";
import { Providers } from "../../redux/provider";
import AuthClientComponent from "../components/Auth.client";
import config from "../aws-exports";
import Header from "../components/Header";
Amplify.configure({ config, ssr: true });

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
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
