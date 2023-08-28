import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://15.165.93.123:8080";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const multipartConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);

export { axiosRequest, multipartrequest };
