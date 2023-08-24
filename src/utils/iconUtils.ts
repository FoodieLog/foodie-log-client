import icons from "../../public/images/foodCategoryIcons";

export function getIcon(category: string): string {
  return icons[category as keyof typeof icons] || "default.png";
}