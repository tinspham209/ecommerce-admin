import prismadb from "@/lib/prismadb";

export const getStoreByIdAndUserId = async (id: string, userId: string) => {
	const store = await prismadb.store.findFirst({
		where: {
			id,
			userId,
		},
	});

	return store;
};

export const getStoreByUserId = async (userId: string) => {
	const store = await prismadb.store.findFirst({
		where: {
			userId,
		},
	});

	return store;
};

export const getStoreById = async (storeId: string) => {
	const store = await prismadb.store.findFirst({
		where: {
			id: storeId,
		},
	});

	return store;
};

export const getStoresByUserId = async (userId: string) => {
	const store = await prismadb.store.findMany({
		where: {
			userId,
		},
	});

	return store;
};
