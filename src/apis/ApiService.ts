import axios, {AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from 'axios';
import Swal from 'sweetalert2';
import XitCmm from 'commons/XitCmm';
import Alert from 'react-s-alert';
import {IApiResponse} from 'types/ApiModel';
//import Alert from 'react-s-alert';
//import withReactContent from 'sweetalert2-react-content';

//const SweetAlert = withReactContent(Swal);

type CustomResponseFormat<T = any> = {
  response: T; //e<T>;
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

const reqApi: CustomInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : '',
  withCredentials: process.env.NODE_ENV === 'development', // 개발시만 사용 : crossdomain
  timeout: 1000
  // headers: {
  //   'Content-Type': 'application/json'
  //   //		AUTH_HEADER_NAME: accessToken
  // }
  //params: {key: key}
});

/**
 * before axios request
 */
reqApi.interceptors.request.use(
  (config) => {
    Swal.fire({
      title: 'Please Wait ...',
      //html: '',
      //imageUrl:
      //timer: 10000,
      didOpen: () => Swal.showLoading()
    }).then((r) => {});
    return config;
  },
  ({config, request, response, ...error}) => {
    console.error('========== ApiService.request error Data ==========');
    return alertError(config, request, response, error);
  }
);

/**
 * after axios response
 */
reqApi.interceptors.response.use(
  (response: AxiosResponse) => {
    Swal.close();
    if (!response.data.success) {
      Swal.fire({
        icon: 'error',
        title: 'Api Error',
        html: `${response.data.message}`,
        //imageUrl:
        timer: 5000
      }).then((r) => {});
      console.log(response);
    }
    return Promise.resolve(response.data);
  },
  ({config, request, response, ...error}) => {
    console.error('========== ApiService.response Error Data ==========');
    alertError(config, request, response, error);
    // error 데이타 return
    //return response.data;
    return error;
  }
);

/**
 * 에러 처리
 * TODO :: 토큰 에러인 경우 업무 정의에 따라 alert 처리 여부등 결정하여 내용 추가
 * @param config
 * @param request
 * @param response
 * @param error
 */
const alertError = function (config: AxiosRequestConfig, request: any, response: AxiosResponse, error: Error) {
  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Api Error',
      html: `시스템 에러~~~~~~~~~~~~`,
      //imageUrl:
      timer: 5000
    }).then((r) => {});
    return;
  }

  const errCode = response.data.code;
  const errMsg = response.data.error;
  console.error(`${errCode}: ${errMsg}`);
  console.error('=================================');

  //Alert.error(`${errCode}: ${errMsg}`);
  Swal.fire({
    icon: 'error',
    title: 'Api Error',
    html: `${errCode}: ${errMsg}`,
    //imageUrl:
    timer: 5000
  }).then((r) => {});

  // return Promise.reject({
  // 	config,
  // 	//message: errMsg,
  // 	response,
  // 	...error
  // })
};
export default reqApi;
