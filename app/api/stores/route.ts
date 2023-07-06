import prismadb from "@/lib/prismadb";
import { CreateStoreSchema } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const { name } = CreateStoreSchema.parse(body);
		const existingStore = await prismadb.store.findFirst({
			where: {
				name,
			},
		});
		if (existingStore) {
			return new NextResponse(
				"Store name is already in our system. Please try another name",
				{ status: 400 }
			);
		}
		const store = await prismadb.store.create({
			data: {
				name,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(
				`Invalid request data passed: ${JSON.stringify(error)}`,
				{ status: 422 }
			);
		}
		return new NextResponse("Internal error", { status: 500 });
	}
}
