import CommandsSideBar from "@/components/SideBar";

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
