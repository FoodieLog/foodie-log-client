import space_dashboard from "@assets/icons/gnb/space_dashboard.png";
import space_dashboard_checked from "@assets/icons/gnb/space_dashboard_check.png";
import map from "@assets/icons/gnb/map.png";
import map_checked from "@assets/icons/gnb/map_check.png";
import thumb_up from "@assets/icons/gnb/thumb_up.png";
import thumb_up_checked from "@assets/icons/gnb/thumb_up_check.png";
import person from "@assets/icons/gnb/person.png";
import person_checked from "@assets/icons/gnb/person_check.png";
import { NavItemType } from "@@types/navigation";

export const globalNavigation: NavItemType[] = [
  {
    icon: space_dashboard,
    icon_checked: space_dashboard_checked,
    label: "피드",
    route: "/main/home",
  },
  {
    icon: map,
    icon_checked: map_checked,
    label: "내 지도",
    route: "/main/liked",
  },
  {
    icon: thumb_up,
    icon_checked: thumb_up_checked,
    label: "지역별",
    route: "/main/recommend",
  },
  {
    icon: person,
    icon_checked: person_checked,
    label: "마이",
    route: "/main/mypage",
  },
];
