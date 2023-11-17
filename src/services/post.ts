import { useUserStore } from "@/src/store/useUserStore";
import { multipartRequest } from "@/src/services";

// Fetch 기본 설정
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 피드 등록 (axios)
export const postFeed = async (body: FormData) => {
  const accessToken = useUserStore.getState().user.accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await multipartRequest.post("/api/feed", body, { headers });

  return res;
};

// 피드 등록 - 검색
export const searchShop = async (keyword: string) => {
  const accessToken = useUserStore.getState().user.accessToken;
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await fetch(`${BASE_URL}/api/feed/search/restaurant?keyword=${keyword}`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return data;
};
