"use client";

import { useStoreModal } from "@/hooks";
import React from "react";

const SetupPage = () => {
	const onOpenModal = useStoreModal((state) => state.onOpen);
	const isOpenModal = useStoreModal((state) => state.isOpen);

	React.useEffect(() => {
		if (!isOpenModal) {
			onOpenModal();
		}
	}, [isOpenModal, onOpenModal]);

	return <div className="p-4">Root Page</div>;
};

export default SetupPage;
