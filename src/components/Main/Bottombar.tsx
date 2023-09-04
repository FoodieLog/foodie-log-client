"use client";
import React from "react";
import Link from "next/link";
import { sidebarLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";

const Bottombar = () => {
  const pathname = usePathname();
  const { id } = useUserStore((state) => state.user);

  return (
    <section className="bottombar w-full max-w-screen-sm mx-auto z-10 py-2 border-t-[1px] bg-white border-solid sm:hidden">
      <div className="bottombar_container flex justify-around ">
        {sidebarLinks
          .filter((link) => link.label !== "Search" && link.label !== "Notification")
          .map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            const IconComponent = link.icon;
            return (
              <Link href={link.route} key={link.route} className={`py-2 ${isActive && "bg-mint rounded-lg"}`}>
                <div className="flex items-center">
                  <IconComponent className="text-2xl mx-2" />
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Bottombar;
