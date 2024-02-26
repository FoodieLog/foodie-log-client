import {
  SpaceDashboard,
  SpaceDashboardCheck,
  MapIcon,
  MapIconCheck,
  ThumbUp,
  ThumbUpCheck,
  Person,
  PersonCheck,
} from "@assets/icons";
import { NavItemType } from "@@types/navigation";

export const globalNavigation: NavItemType[] = [
  {
    icon: SpaceDashboard,
    icon_checked: SpaceDashboardCheck,
    label: "피드",
    route: "/main/home",
  },
  {
    icon: MapIcon,
    icon_checked: MapIconCheck,
    label: "내 지도",
    route: "/main/liked",
  },
  {
    icon: ThumbUp,
    icon_checked: ThumbUpCheck,
    label: "지역별",
    route: "/main/recommend",
  },
  {
    icon: Person,
    icon_checked: PersonCheck,
    label: "마이",
    route: "/main/mypage",
  },
];
