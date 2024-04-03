"use client";
import React from "react";
// import { globalNavigation } from "@constants";
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
          return (
            <Link href={link.route} key={link.route} className="flex items-center">
              <Image src={isActive ? link.icon_checked : link.icon} alt={link.route} />
              <p className={`font-semibold mx-2 max-lg:hidden ${isActive ? "text-red" : "text-gray-3"}`}>
                {link.label}
              </p>
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
