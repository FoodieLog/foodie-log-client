import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "@store/useUserStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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

const userRequest = axios.create(axiosConfig);

const kakaoRequest = axios.create(kakaoConfig);

const kakaoLogoutRequest = axios.create(kakaoLogoutConfig);

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
kakaoRequest.interceptors.request.use(setAuthTokenInterceptor);
kakaoLogoutRequest.interceptors.request.use(setKakaoTokenInterceptor);

export { axiosRequest, userRequest, kakaoRequest, kakaoLogoutRequest };
