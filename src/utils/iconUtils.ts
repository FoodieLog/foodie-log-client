import icons from "../../public/images/foodCategoryIcons";

export function getIcon(category: string): string {
  for (const key in icons) {
    if (category.includes(key)) {
      return icons[key];
    }
  }
  return "default.png";
}


// export function getIcon(category: string): string {
//   return icons[category as keyof typeof icons] || "default.png";}
