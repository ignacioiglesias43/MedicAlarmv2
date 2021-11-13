import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

import {API_URL} from '@env';
export interface RequestProps {
  method: Method;
  url: string;
  headers?: AxiosRequestConfig['headers'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

const api = axios.create({
  baseURL: API_URL,
});

const request = <T>({
  method,
  url,
  headers = {},
  data = {},
  params = {},
}: RequestProps): Promise<AxiosResponse<T>> =>
  api.request<T>({
    method,
    url,
    params,
    data,
    headers: {
      ...headers,
      //'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

export default request;
