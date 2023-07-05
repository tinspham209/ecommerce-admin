"use client";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@/components/ui";

const formSchema = z.object({
	name: z.string().min(1),
});

type FormValue = z.infer<typeof formSchema>;

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const form = useForm<FormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: FormValue) => {
		console.log("values: ", values);
		// Create store
	};

	return (
		<Modal
			title="Create store"
			description="Add a new store to manage products and categories"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="E-Commerce" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button variant={"outline"} onClick={storeModal.onClose}>
									Cancel
								</Button>
								<Button type="submit">Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
