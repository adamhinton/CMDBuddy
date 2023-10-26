import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { Providers } from "../../redux/provider";

Amplify.configure(config);

export const metadata = {
	title: "Next.js",
	description: "Generated by Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
