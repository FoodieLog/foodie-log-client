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

// ============ 댓글 API ============

export const getReplyList = async (feedId: number, replyId: number = 0) => {
  const res = await axiosRequest.get(`api/reply/${feedId}?replyId=${replyId}`);
  return res;
};

export const saveReply = async (feedId: number, content: string) => {
  const res = await axiosRequest.post(`api/reply/${feedId}`, { content });
  return res;
};

export const deleteReply = async (feedId: number) => {
  const res = await axiosRequest.delete(`api/reply/${feedId}`);
  return res;
};
