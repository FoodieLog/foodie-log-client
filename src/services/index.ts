import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "../store/useUserStore";

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

const accessToken = useUserStore.getState().user.accessToken;

const PostConfig: AxiosRequestConfig = {

  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${accessToken}` },
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);
const postRequest = axios.create(PostConfig);

export { axiosRequest, multipartrequest, postRequest };
