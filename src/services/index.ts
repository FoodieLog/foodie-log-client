import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "@/src/store/useUserStore";

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

const kakaoConfig: AxiosRequestConfig = {
  baseURL: "https://kauth.kakao.com/oauth/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
};

const kakaoLogoutConfig: AxiosRequestConfig = {
  baseURL: "https://kapi.kakao.com/v1/user",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
};

const axiosRequest = axios.create(axiosConfig);

const multipartRequest = axios.create(multipartConfig);

const userRequest = axios.create(axiosConfig);

const kakaoRequest = axios.create(kakaoConfig);

const kakaoLogoutRequest = axios.create(kakaoLogoutConfig);

// Axios 인터셉터를 사용하여 매 요청 전에 토큰 값을 가져와 `Authorization` 헤더에 설정
const setAuthTokenInterceptor = (config: any) => {
  const accessToken = useUserStore.getState().user.accessToken;

  // headers에 기본값 설정
  config.headers = config.headers || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const setKakaoTokenInterceptor = (config: any) => {
  const kakaoAccessToken = useUserStore.getState().user.kakaoAccessToken;

  // headers에 기본값 설정
  config.headers = config.headers || {};

  if (kakaoAccessToken) {
    config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
  }
  return config;
};

// 각 axios 인스턴스에 인터셉터 적용
userRequest.interceptors.request.use(setAuthTokenInterceptor);

multipartRequest.interceptors.request.use(setAuthTokenInterceptor);
kakaoRequest.interceptors.request.use(setAuthTokenInterceptor);
kakaoLogoutRequest.interceptors.request.use(setKakaoTokenInterceptor);

export { axiosRequest, multipartRequest, userRequest, kakaoRequest, kakaoLogoutRequest };
