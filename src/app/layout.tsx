import { Amplify, Auth } from "aws-amplify";
import { Providers } from "../../redux/provider";
import AuthClientComponent from "../components/Auth.client";
import config from "../aws-exports";
import Header from "../components/Header";
Amplify.configure({ config, ssr: true });
Auth.configure({ config, ssr: true });
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { lightTheme, darkTheme } from "../../utils/styles/themes";
import { ToastContainer } from "react-toastify";
import Tabs from "@/components/Tabs";

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
					<ThemeProviderWrapper>
						<AuthClientComponent />
						<Header />
						<Tabs />
						<main>{children}</main>
						<ToastContainer />
					</ThemeProviderWrapper>
				</Providers>
			</body>
		</html>
	);
}
