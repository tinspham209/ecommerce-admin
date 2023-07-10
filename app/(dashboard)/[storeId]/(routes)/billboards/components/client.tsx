"use client";

import { Button, Heading, Separator } from "@/components/ui";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface BillboardClientProps {}

const BillboardClient: React.FC<BillboardClientProps> = ({}) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Billboards (0)`}
					description="Manage billboards for your store"
				/>
				<Button
					onClick={() => {
						router.push(`/${params.storeId}/billboards/new`);
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default BillboardClient;
