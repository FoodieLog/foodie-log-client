import { asian, bar, cafe, dessert, japanese, korean, snack, western } from "@assets/images";

export function getIcon(category: string): string {
  const RESTAURANT_CATEGORY: { [key: string]: any } = {
    한식: korean,
    카페: cafe,
    간식: dessert,
    분식: snack,
    아시아: asian,
    일식: japanese,
    양식: western,
    술집: bar,
    퓨전요리: bar, //아이콘 수정하기
  };

  for (const key in RESTAURANT_CATEGORY) {
    if (category.includes(key)) {
      return RESTAURANT_CATEGORY[key];
    }
  }
  return "foodDefault.png";
}

// export function getIcon(category: string): string {
//   return icons[category as keyof typeof icons] || "default.png";}
