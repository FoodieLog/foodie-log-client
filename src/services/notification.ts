import axios from "axios";
import { useUserStore } from "@store/useUserStore";

// ============ Axios Instance ============

/** axios 인스턴스 */
const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/** axios 인스턴스에 인터셉터 적용 */
axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().user.accessToken;
    if (accessToken) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============ 피드 API ============

/** 피드 공유 요청 */
export const getNotification = async () => {
  const res = await axiosRequest.get(`api/notification/list`);
  return res;
};
