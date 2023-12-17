import SideBar from "@/components/SideBar/SideBar";
import Link from "next/link";

export default function CommandsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SideBar />
			<Link href="/login">Login page</Link>
			<Link href="/commands/create">Create Commands</Link>
			<Link href="/commands/generate">Generate Commands</Link>
			{children}
		</>
	);
}
