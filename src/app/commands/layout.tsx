import CommandsSideBar from "@/components/CommandsSideBar";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<CommandsSideBar />
			{children}
		</>
	);
}
