import { StaticImageData } from "next/image";
import asian from "@assets/images/restaurants/asian.png";
import bar from "@assets/images/restaurants/bar.png";
import cafe from "@assets/images/restaurants/cafe.png";
import dessert from "@assets/images/restaurants/dessert.png";
import japanese from "@assets/images/restaurants/japanese.png";
import korean from "@assets/images/restaurants/korean.png";
import snack from "@assets/images/restaurants/snack.png";
import western from "@assets/images/restaurants/western.png";
import BasicThumbnail from "@assets/images/basic/basic_thumb.png";

export function getIcon(category: string): StaticImageData {
  const RESTAURANT_CATEGORY: { [key: string]: StaticImageData } = {
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
  return BasicThumbnail;
}
