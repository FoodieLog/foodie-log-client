import { userRequest } from "@services";

export const postFeed = async (body: FormData) => {
  const res = await userRequest.post("/api/feed", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getSearchShop = async (keyword: string) => {
  const res = await userRequest.get(`/api/feed/search/restaurant?keyword=${keyword}`);
  return res;
};
