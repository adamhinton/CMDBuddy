// Sidebar is the list of user's Commands
// They can edit the Command's title, rearrange their order or delete commands
// Clicking a Command brings it up in the main UI
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
