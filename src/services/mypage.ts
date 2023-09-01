import { useUserStore } from "../store/useUserStore";

const accessToken = useUserStore.getState().user.accessToken;
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
};

export const getThumbnails = async (userId: number, feed: number) => {
  const res = await fetch(`${baseURL}/api/user/${userId}/feed/thumbnail`, {
    method: "GET",
    headers,
  });

  const data = await res.json();
  console.log("썸", data);
  return data;
};
