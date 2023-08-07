import axios, {AxiosInstance} from 'axios';
import {BACKEND_BASE_URL, REQUEST_TIMEOUT} from '../constants';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};
