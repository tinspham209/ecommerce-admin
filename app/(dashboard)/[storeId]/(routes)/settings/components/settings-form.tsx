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
} from "@/components/ui";
import MyTooltip from "@/components/ui/my-tooltip";
import { useOrigin } from "@/hooks";
import { SettingFormPayload, SettingFormSchema } from "@/lib/validators";
import { useDeleteStore, useUpdateSettingStore } from "@/queries/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
interface SettingFormProps {
	initialData: Store;
}

const SettingForm = ({ initialData }: SettingFormProps) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [openAlertModal, setOpenAlertModal] = React.useState(false);

	const form = useForm<SettingFormPayload>({
		resolver: zodResolver(SettingFormSchema),
		defaultValues: initialData,
	});

	const { updateSettingStore, isLoading } = useUpdateSettingStore({
		onSuccess(data) {
			router.refresh();
			toast.success("Update Setting successfully!");
		},
		onError(error) {
			toast.error(
				`Error when update setting: ${JSON.stringify(error.message)}`
			);
		},
	});

	const onSubmit = async (values: SettingFormPayload) => {
		console.log("values: ", values);
		updateSettingStore({
			name: values.name,
			storeId: params.storeId,
		});
	};

	const { deleteStore, isLoading: isLoadingDeleteStore } = useDeleteStore({
		onSuccess(data) {
			router.refresh();
			router.push("/");
			toast.success("Delete store successfully!");
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error(`${error.response?.data?.message}`);
			}
		},
	});

	const onDeleteStore = async () => {
		deleteStore({
			storeId: params.storeId,
		});
	};

	return (
		<>
			<AlertModal
				isOpen={openAlertModal}
				loading={isLoadingDeleteStore}
				onClose={() => setOpenAlertModal(false)}
				onConfirm={() => {
					onDeleteStore();
				}}
			/>
			<div className="flex items-center justify-between">
				<Heading title="Settings" description="Manage store preferences" />

				<MyTooltip title="Remove store">
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
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={isLoading} className="ml-auto" type="submit">
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			<Heading title="API" description="Manage store API" />

			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${params.storeId}`}
				variant="public"
			/>
		</>
	);
};

export default SettingForm;
