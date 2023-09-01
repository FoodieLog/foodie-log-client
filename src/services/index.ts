import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "../store/useUserStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken = useUserStore.getState().user.accessToken;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const multipartConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const userConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);
const userRequest = axios.create(userConfig);

export { axiosRequest, multipartrequest, userRequest };
