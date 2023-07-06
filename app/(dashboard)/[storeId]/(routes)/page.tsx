import { getStoreById } from "@/actions";
import React from "react";

interface DashboardPageProps {
	params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
	const { storeId } = params;
	const store = await getStoreById(storeId);

	return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
