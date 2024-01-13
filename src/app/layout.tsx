// TODO:
// Any other toasts
// DND for params
// Error handling - specifically db submissions. Partially done
// TODO: in /generate, fix default values funniness. UPDATE 1.12.24: This seems to have gone away. Check again later.
// TODO: Handle /generate validation
// TODO: /commands/create cleanup
// TODO: Figure out home page stuff - not even have a homepage probably
// TODO: Figure out redirect on login
// TODO: Background styling. Just universal backgrounds, should be easy
// TODO: Capability to make commands in localstorage without auth

// TODO CCF:
// Fix ordering of new/edited commands

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
				<ToastWrapper>
					<Providers>
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
