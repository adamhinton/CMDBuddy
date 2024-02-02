// TODO Stretch: Capability to make commands in localstorage without auth

// TODO Stretch: More server components; commands/create/page.tsx is a server component right now, use that as reference

// TODO Stretch: Pre-saved filled out commands. Different from defaultValues in that it's a specific set of param values, like if I consistently come back to making a 25yo male from PA.

// TODO Stretch: "Reminder" property in Parameter and Command that reminds the user what they're for on hover, like with tooltip.

// TODO Stretch CCF: Fix ordering of new/edited commands

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
import Link from "next/link";
import styled from "styled-components";

export const metadata = {
	title: "CMDBuddy",
	description: "Generate CLI Commands",
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
							<span></span>
						</ThemeProviderWrapper>
					</Providers>
				</ToastWrapper>
			</body>
		</html>
	);
}
