import { getStoreByIdAndUserId } from "@/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import BillboardClient from "./components/client";

interface SettingPageProps {
	params: {
		storeId: string;
	};
}

const SettingPage = async ({ params }: SettingPageProps) => {
	const { storeId } = params;
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}

	const store = await getStoreByIdAndUserId(storeId, userId);
	if (!store) {
		redirect("/");
	}

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardClient />
			</div>
		</div>
	);
};

export default SettingPage;
