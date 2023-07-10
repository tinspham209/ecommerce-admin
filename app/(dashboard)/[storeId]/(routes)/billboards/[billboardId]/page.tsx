import { getBillboardById } from "@/actions";
import React from "react";
import BillboardForm from "./components/billboard-form";

interface BillboardDetailProps {
	params: { billboardId: string };
}

const BillboardDetail = async ({ params }: BillboardDetailProps) => {
	const { billboardId } = params;

	const billboard = await getBillboardById(billboardId);

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default BillboardDetail;
