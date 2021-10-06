import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

export interface RequestProps {
  method: Method;
  url: string;
  headers?: AxiosRequestConfig['headers'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

// TODO: Change URL
const api = axios.create({
  baseURL: 'http://localhost:5000',
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
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

export default request;
