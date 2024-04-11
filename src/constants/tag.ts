import { RestaurantCategory } from "../types/restaurant";

export const tagNames = ["한식", "카페", "분식", "아시안", "일식", "양식", "주점", "퓨전", "기타"];

export const categoryTags: { [key: string]: RestaurantCategory } = {
  한식: "korean",
  카페: "cafe",
  분식: "snack",
  아시안: "asian",
  일식: "japanese",
  양식: "western",
  주점: "bar",
  기타: "etc",
  퓨전: "fusion",
  전체: "",
};
