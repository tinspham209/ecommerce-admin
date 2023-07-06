import { z } from "zod";

export const SettingFormSchema = z.object({
	name: z.string().min(1),
	storeId: z.string().optional().nullable(),
});

export type SettingFormPayload = z.infer<typeof SettingFormSchema>;
