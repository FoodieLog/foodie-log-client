import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const multipartConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);

export { axiosRequest, multipartrequest };
