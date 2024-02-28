import { StaticImageData } from "next/image";

export interface NavItemType {
  icon: StaticImageData;
  icon_checked: StaticImageData;
  label: string;
  route: string;
}
