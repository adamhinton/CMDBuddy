import SideBar from "@/components/SideBar/SideBar";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SideBar />
			{children}
		</>
	);
}
