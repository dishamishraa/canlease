import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { SESSION_COOKIE_NAME } from '../config';

const instance = axios.create({ withCredentials: true });

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const cookie = Cookies.get(SESSION_COOKIE_NAME);
    if(cookie) {
        config.headers = {
            ...config.headers,
            Cookie: `${SESSION_COOKIE_NAME}=${cookie};`,
        }
    }
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

const { isAxiosError } = axios;
export {
  isAxiosError,
};

export default instance;
