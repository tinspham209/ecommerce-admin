import { getStoreByIdAndUserId } from "@/actions";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}
	const store = await getStoreByIdAndUserId(params.storeId, userId);
	if (!store) {
		redirect("/");
	}

	return (
		<>
			<Navbar/>
			Store Id: {JSON.stringify(params.storeId)}
			<div className="">{children}</div>
		</>
	);
}
