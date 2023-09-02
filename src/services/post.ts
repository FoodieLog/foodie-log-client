import { postRequest } from "./index";

// Fetch 기본 설정
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = localStorage.getItem("token");
const headers = {
  "content-type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

// 피드 등록 (axios)
export const postFeed = async (body: FormData) => {
  const res = await postRequest.post("/api/feed/save", body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });
  console.log("feed 등록 서버 응답데이터", res);
  return res;
};

// 피드 등록 - 검색
export const searchShop = async (keyword: string) => {
  console.log("searchShop", keyword);
  const res = await fetch(`${BASE_URL}/api/feed/search/restaurant?keyword=${keyword}`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return data;
};
