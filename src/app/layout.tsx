import { Amplify, Auth } from "aws-amplify";
import { Providers } from "../../redux/provider";
import AuthClientComponent from "../components/Auth.client";
import config from "../aws-exports";
import Header from "../components/Header";
Amplify.configure({ config, ssr: true });
Auth.configure({ config, ssr: true });
import Tabs from "@/components/Tabs";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
// Using react-toastify to alert user of various things with toasts.
import ToastWrapper from "../../utils/ToastWrapper";

export const metadata = {
	title: "CMDBuddy",
	description: "Generate CLI Commands",
	icons: {
		icon: "/icon.ico",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ToastWrapper>
					<Providers>
						{/* ThemeProviderWrapper also contains GlobalStyles */}
						<ThemeProviderWrapper>
							<AuthClientComponent />
							<Header />
							<Tabs />
							<main>{children}</main>
						</ThemeProviderWrapper>
					</Providers>
				</ToastWrapper>
			</body>
		</html>
	);
}
