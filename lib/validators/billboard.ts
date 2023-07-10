import { z } from "zod";

export const BillboardFormSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
	storeId: z.string().optional().nullable(),
});

export type BillboardFormPayload = z.infer<typeof BillboardFormSchema>;
