import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "../store/useUserStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AUTH_TOKEN = useUserStore.getState().user.accessToken;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const multipartConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const accessToken = useUserStore.getState().user.accessToken;

const userConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const formDataConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);
const userRequest = axios.create(userConfig);
const formDataRequest = axios.create(formDataConfig);

// axios 인스턴스 headers - 토큰 설정
// userRequest.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export { axiosRequest, multipartrequest, userRequest, formDataRequest };
