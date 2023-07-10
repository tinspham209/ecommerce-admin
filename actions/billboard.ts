import prismadb from "@/lib/prismadb";

export const getBillboardById = async (id: string) => {
	const store = await prismadb.billboard.findUnique({
		where: {
			id,
		},
	});

	return store;
};
