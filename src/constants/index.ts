import { HiOutlineHome } from "react-icons/hi";
import { FiMapPin, FiThumbsUp } from "react-icons/fi";
import { BiSmile } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";

export const sidebarLinks = [
  {
    icon: HiOutlineHome,
    label: "Home",
    route: "/main/home",
  },
  {
    icon: FiMapPin,
    label: "Maps",
    route: "/main/maps",
  },
  {
    icon: AiOutlinePlusCircle,
    label: "Feed",
    route: "/main/feed",
  },
  {
    icon: FiThumbsUp,
    label: "Recommend",
    route: "/main/recommend",
  },
  {
    icon: BiSmile,
    label: "User",
    route: "/main/user",
  },
  {
    icon: IoIosSearch,
    label: "Search",
    route: "/main/search",
  },
  {
    icon: IoMdNotificationsOutline,
    label: "Notification",
    route: "/main/notification",
  },
];
