"use client";
import React from "react";
import Link from "next/link";
import useShowPartial from "@hooks/useShowPartial";
import { Dashboard, Map, Space, Person, DashboardCheck, MapCheck, SpaceCheck, PersonCheck } from "@assets/icons";
import { NavItemType } from "@@types/navigation";
import { useUserStore } from "@store/useUserStore";
import useResetRecommend from "@hooks/useResetRecommend";

function GlobalNavigation() {
  const { pathname, isShow } = useShowPartial();
  const { user } = useUserStore();
  useResetRecommend();

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
    <>
      {isShow && (
        <nav className="fixed bottom-0 left-0 right-0 z-10 w-full max-w-screen-sm mx-auto h-20 border-t-[1px] bg-gray-0 border-solid sm:hidden">
          <ul className="h-full flex px-2.5">
            {globalNavigation.map((link) => {
              const isActive = pathname === link.route;
              const Icon = link.icon;
              const ActiveIcon = link.icon_checked;
              return (
                <li key={link.route} className="w-full flex justify-center">
                  <Link href={link.route} className="flex flex-col items-center justify-center">
                    {isActive ? <ActiveIcon className="mb-[11px]" /> : <Icon className="mb-[11px]" />}
                    <p className={`text-xs font-semibold ${isActive ? "text-red" : "text-gray-3"}`}>{link.label}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
}

export default GlobalNavigation;
