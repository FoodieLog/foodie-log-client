import { asian, bar, cafe, dessert, japanese, korean, snack, western } from "@assets/images";
import { createElement } from "react";
import {
  Asian,
  AsianSelected,
  Bar,
  BarSelected,
  Cafe,
  CafeSelected,
  Dessert,
  DessertSelected,
  Japanese,
  JapaneseSelected,
  Korean,
  KoreanSelected,
  Snack,
  SnackSelected,
  Western,
  WesternSelected,
} from "../assets/icons";

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

export const getTagIcon = (tagName: string, isSelected: boolean) => {
  const tagIcons: { [key: string]: { selected: React.ElementType; unSelected: React.ElementType } } = {
    한식: { unSelected: Korean, selected: KoreanSelected },
    카페: { unSelected: Cafe, selected: CafeSelected },
    디저트: { unSelected: Dessert, selected: DessertSelected },
    분식: { unSelected: Snack, selected: SnackSelected },
    아시안: { unSelected: Asian, selected: AsianSelected },
    일식: { unSelected: Japanese, selected: JapaneseSelected },
    양식: { unSelected: Western, selected: WesternSelected },
    주점: { unSelected: Bar, selected: BarSelected },
  };

  return createElement(tagIcons[tagName][isSelected ? "selected" : "unSelected"]);
};
