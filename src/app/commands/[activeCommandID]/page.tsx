export default function Page({
	params,
}: {
	params: { activeCommandID: string };
}) {
	return <div>My Post: {params.activeCommandID}</div>;
}
