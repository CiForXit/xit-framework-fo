import axios, {AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from 'axios';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';

//const SweetAlert = withReactContent(Swal);

type CustomResponseFormat<T = any> = {
	response: T;
	refreshedToken?: string;
};

export interface CustomInstance extends AxiosInstance {
	interceptors: {
		request: AxiosInterceptorManager<AxiosRequestConfig>;
		response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
	};

	getUri(config?: AxiosRequestConfig): string;

	request<T>(config: AxiosRequestConfig): Promise<T>;

	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

	head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

	options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

	post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

	put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

	patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export const client: CustomInstance = axios.create({
	baseURL: process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_API_URL : '',
	// proxy cors : true, 운영은 false
	withCredentials: process.env.NODE_ENV === 'development', // 개발시만 사용 : crossdomain
	timeout: 100000
	//params: {key: key}
});

client.interceptors.response.use(
	function (config) {
		Swal.fire({
			title: 'Please Wait ...',
			//html: '',
			//imageUrl:
			timer: 10000,
			didOpen: () => Swal.showLoading()
		}).then((r) => {});
		return config;
	},
	(error) => {
		Swal.close();
		console.log('ERROR :: request loading finished!!!', error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		//	Swal.close();
		return Promise.resolve(response);
	},
	(error) => {
		Swal.close();
		console.log('ERROR :: response loading finished!!!', error);
		return Promise.reject(error);
	}
);

// res - AxiosResponse<CustomResponseFormat>
// client.interceptors.response.use((res) => {
//   if (res.data.refreshedToken) TokenManager.replace(refreshedToken);
//   return res.data.response;
// });
//
// client.interceptors.request.use((request) => {
//   request.headers.authorization = TokenManager.accessToken;
//   return request;
// });
