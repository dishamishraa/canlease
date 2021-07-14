import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({ withCredentials: true });

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
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
