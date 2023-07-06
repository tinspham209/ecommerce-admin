import { CreateStorePayload } from "@/lib/validators";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

export function useCreateStore(
	options?: UseMutationOptions<any, Error, CreateStorePayload>
) {
	const { mutate: createStore, isLoading } = useMutation<
		any,
		Error,
		CreateStorePayload
	>({
		mutationFn: async (payload: CreateStorePayload) => {
			const { data } = await apiClient.createStore(payload);

			return data as string;
		},
		...options,
	});

	return {
		createStore,
		isLoading,
	};
}
