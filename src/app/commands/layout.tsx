<<<<<<< HEAD
// Sidebar is the list of user's Commands
// They can edit the Command's title, rearrange their order or delete commands
// Clicking a Command brings it up in the main UI
=======
import CommandsSideBar from "@/components/CommandsSideBar";
>>>>>>> 87215d815e18d671c181df533d899ee70dadbc81
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
