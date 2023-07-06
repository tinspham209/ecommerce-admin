import prismadb from "@/lib/prismadb";
import { SettingFormSchema } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const body = await req.json();
		const { name } = SettingFormSchema.parse(body);

		const store = await prismadb.store.updateMany({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name,
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

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
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
