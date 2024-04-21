"use client";
import React from "react";
import Dashboard from "@assets/icons/gnb/Feed.svg";
import Map from "@assets/icons/gnb/Map.svg";
import Space from "@assets/icons/gnb/Space.svg";
import Person from "@assets/icons/gnb/Person.svg";
import DashboardCheck from "@assets/icons/gnb/FeedCheck.svg";
import MapCheck from "@assets/icons/gnb/MapCheck.svg";
import SpaceCheck from "@assets/icons/gnb/SpaceCheck.svg";
import PersonCheck from "@assets/icons/gnb/PersonCheck.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FoodieLogoTP, FoodieLogo } from "@/public/images";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import useLogout from "@hooks/useLogout";
import { NavItemType } from "@@types/navigation";
import { useUserStore } from "@/src/store/useUserStore";

const BottomSideBar = () => {
  const pathname = usePathname();
  const { logout } = useLogout();
  const { user } = useUserStore();

  const globalNavigation: NavItemType[] = [
    {
      icon: Dashboard,
      icon_checked: DashboardCheck,
      label: "피드",
      route: "/main/home",
    },
    {
      icon: Map,
      icon_checked: MapCheck,
      label: "내 지도",
      route: "/main/liked",
    },
    {
      icon: Space,
      icon_checked: SpaceCheck,
      label: "지역별",
      route: "/main/recommend",
    },
    {
      icon: Person,
      icon_checked: PersonCheck,
      label: "마이",
      route: `/main/${user.id}`,
    },
  ];

  return (
    <section className="flex flex-col h-screen border-r-[1px] border-solid sticky top-0 max-sm:hidden justify-between">
      <div className="flex w-full flex-1 flex-col items-center gap-12 px-6 mt-6">
        <Image src={FoodieLogoTP} alt="logo" className="w-[100px] h-auto max-lg:hidden" />
        <Image src={FoodieLogo} alt="logo" className="w-[70px] h-[70px] lg:hidden ml-2" />
        {globalNavigation.map((link) => {
          const isActive = link.route && pathname.includes(link.route);
          const Icon = link.icon;
          const ActiveIcon = link.icon_checked;
          return (
            <Link href={link.route} key={link.route} className="flex items-center">
              {isActive ? <ActiveIcon /> : <Icon />}
              <p className={`font-semibold mx-2 ${isActive ? "text-red" : "text-gray-3"}`}>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center cursor-pointer mb-7" onClick={logout}>
        <TbLogout2 className="text-2xl mx-2" />
        <p className="ml-2 max-lg:hidden">Logout</p>
      </div>
    </section>
  );
};

export default BottomSideBar;
