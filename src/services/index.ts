// import axios, { AxiosRequestConfig } from "axios";
// import { useUserStore } from "../store/useUserStore";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const accessToken = useUserStore.getState().user.accessToken;

// const axiosConfig: AxiosRequestConfig = {
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// const multipartConfig: AxiosRequestConfig = {
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// };

// const userConfig: AxiosRequestConfig = {
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// };

// const formDataConfig: AxiosRequestConfig = {
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// };

// const axiosRequest = axios.create(axiosConfig);
// const multipartrequest = axios.create(multipartConfig);
// const userRequest = axios.create(userConfig);
// const formDataRequest = axios.create(formDataConfig);

// // axios 인스턴스 headers - 토큰 설정
// // userRequest.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// export { axiosRequest, multipartrequest, userRequest, formDataRequest };

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

const kakaoConfig: AxiosRequestConfig = {
  baseURL: "https://kauth.kakao.com/oauth/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
};

const kakaoLogoutConfig: AxiosRequestConfig = {
  baseURL: "https://kapi.kakao.com/v1/user",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const axiosRequest = axios.create(axiosConfig);
const multipartrequest = axios.create(multipartConfig);

const userRequest = axios.create(axiosConfig);
const formDataRequest = axios.create(axiosConfig);

const kakaoRequest = axios.create(kakaoConfig);

const kakaoLogoutRequest = axios.create(kakaoLogoutConfig);

// Axios 인터셉터를 사용하여 매 요청 전에 토큰 값을 가져와 `Authorization` 헤더에 설정
const setAuthTokenInterceptor = (config: any) => {
  console.log("config : ", config);
  const accessToken = useUserStore.getState().user.accessToken;

  // headers에 기본값 설정
  config.headers = config.headers || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const setKakaoTokenInterceptor = (config: any) => {
  console.log("config : ", config);
  const accessToken = useUserStore.getState().user.kakaoAccessToken;

  // headers에 기본값 설정
  config.headers = config.headers || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

// 각 axios 인스턴스에 인터셉터 적용
userRequest.interceptors.request.use(setAuthTokenInterceptor);
formDataRequest.interceptors.request.use(setAuthTokenInterceptor);
multipartrequest.interceptors.request.use(setAuthTokenInterceptor);
kakaoRequest.interceptors.request.use(setAuthTokenInterceptor);
kakaoLogoutRequest.interceptors.request.use(setKakaoTokenInterceptor);

export { axiosRequest, multipartrequest, userRequest, formDataRequest, kakaoRequest, kakaoLogoutRequest };
