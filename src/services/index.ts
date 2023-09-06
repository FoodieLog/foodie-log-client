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



//export const makeFeedFetchRequest = async <T>(
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
//   body?: any
// ): Promise<T> => {
//   const accessToken = useUserStore.getState().user.accessToken;

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       method,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "multipart/form-data",
//       },
//       body: body ? body : null,
//     });

//     if (!response.ok) {
//       throw new Error("API request failed");
//     }

//     // return await response.json();

//     const responseText = await response.text();

//     // 응답 본문이 없는 경우, default 값을 반환합니다.
//     if (!responseText) {
//       return {
//         status: 200,
//         response: {
//           content: [],
//         },
//         error: null,
//       } as unknown as T;
//     }

//     return JSON.parse(responseText);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
