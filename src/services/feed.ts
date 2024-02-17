import axios from "axios";
import { useUserStore } from "@/src/store/useUserStore";

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
    console.log(error);
    return Promise.reject(error);
  }
);

// ============ 피드 API ============

/** 피드 좋아요 요청 */
export const likeFeed = async (feedId: number) => {
  const { data } = await axiosRequest.post("api/feed/like", { feedId });
  return data;
};

/** 피드 좋아요 취소 요청 */
export const unlikeFeed = async (feedId: number) => {
  const { data } = await axiosRequest.delete(`api/feed/unlike?feedId=${feedId}`);

  return { data };
};
