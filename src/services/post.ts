import { userRequest, multipartrequest } from "./index";

export const postFeed = async (body: FormData) => {
  const res = await multipartrequest.post("/api/feed/save", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("feed 등록 서버 응답데이터", res);
  return res;
};

export const searchShop = async (keyword: string) => {
  const res = await userRequest.get(`/api/feed/search/restaurant?keyword=${keyword}`);
  return res;
};
