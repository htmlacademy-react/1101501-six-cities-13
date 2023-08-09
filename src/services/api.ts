import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {BACKEND_BASE_URL, REQUEST_TIMEOUT} from '../constants';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {processErrorHandle} from './process-error-handle';

type TErrorMessage = {
  type: string;
  message: string;
}

const StatusCodeMap: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMap[response.status];


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use((config: AxiosResponse) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<TErrorMessage>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        processErrorHandle(detailMessage.message);
      }
      throw error;
    }
  );

  return api;
};
