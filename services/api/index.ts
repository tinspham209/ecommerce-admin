import { CreateStorePayload } from "@/lib/validators";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const AXIOS_CONFIG = {
	CONNECTION_TIMEOUT: 30000,
};

axios.defaults.withCredentials = true;

const create = (baseURL = "/api") => {
	const api = axios.create({
		baseURL,
		headers: {
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Expires: 0,
			Accept: "application/json",
		},
		timeout: AXIOS_CONFIG.CONNECTION_TIMEOUT,
	});

	api.interceptors.request.use((config) => {
		return Promise.resolve(config);
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.status === 404) {
					return toast.error(
						`This API doesn't exists, Please check the API route again.`
					);
				}
			}
			return Promise.reject(error);
		}
	);

	const getRoot = () => api.get("");

	// Store
	const createStore = (payload: CreateStorePayload) => {
		return api.post(`/stores`, { ...payload });
	};

	return {
		getRoot,

		// Store
		createStore,
	};
};

export type Apis = ReturnType<typeof create>;

export default create;
