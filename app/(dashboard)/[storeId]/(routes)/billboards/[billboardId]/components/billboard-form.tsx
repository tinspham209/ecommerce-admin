"use client";

import AlertModal from "@/components/modals/alert-modal";
import {
	ApiAlert,
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Heading,
	Input,
	Separator,
	ImageUpload,
} from "@/components/ui";
import MyTooltip from "@/components/ui/my-tooltip";
import { useOrigin } from "@/hooks";
import { BillboardFormPayload, BillboardFormSchema } from "@/lib/validators";
import { useDeleteStore, useUpdateSettingStore } from "@/queries/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client";
import { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface BillboardFormProps {
	initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [openAlertModal, setOpenAlertModal] = React.useState(false);

	const isEditMode = React.useMemo(() => {
		return initialData ? true : false;
	}, [initialData]);

	const formContent = React.useMemo(() => {
		if (isEditMode) {
			return {
				title: "Create billboard",
				description: "Add a new billboard",
				toastMessage: "Billboard created successfully.",
				action: "Create",
			};
		} else {
			return {
				title: "Edit billboard",
				description: "Edit a new billboard",
				toastMessage: "Billboard updated successfully.",
				action: "Save changes",
			};
		}
	}, [isEditMode]);

	const form = useForm<BillboardFormPayload>({
		resolver: zodResolver(BillboardFormSchema),
		defaultValues: initialData || {
			label: "",
			imageUrl: "",
		},
	});

	const onSubmit = async (values: BillboardFormPayload) => {
		console.log("values: ", values);
	};

	const isLoading = false;

	return (
		<>
			<AlertModal
				isOpen={openAlertModal}
				loading={isLoading}
				onClose={() => setOpenAlertModal(false)}
				onConfirm={() => {}}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title={formContent.title}
					description={formContent.description}
				/>

				{isEditMode && (
					<MyTooltip title="Remove">
						<div>
							<Button
								variant={"destructive"}
								size={"sm"}
								onClick={() => {
									setOpenAlertModal(true);
								}}
							>
								<Trash className="h-4 w-4 " />
							</Button>
						</div>
					</MyTooltip>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={isLoading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Billboard label"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={isLoading} className="ml-auto" type="submit">
						{formContent.action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
};

export default BillboardForm;
