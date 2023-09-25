"use client";
import React from "react";
import { sidebarLinks } from "../../constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FoodieLogoTP, FoodieLogo } from "@/public/images";
import Image from "next/image";
import Logout from "@/src/services/Logout";
import { TbLogout2 } from "react-icons/tb";

const BottomSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-screen border-r-[1px] border-solid sticky top-0 max-sm:hidden justify-between">
      <div className="flex w-full flex-1 flex-col items-center gap-12 px-6 mt-6">
        <Image src={FoodieLogoTP} alt="logo" className="w-[100px] h-auto max-lg:hidden" />
        <Image src={FoodieLogo} alt="logo" className="w-[70px] h-[70px] lg:hidden ml-2" />
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          const IconComponent = link.icon;
          return (
            <Link href={link.route} key={link.route} className={`py-2 ${isActive && "text-sunflower-sat"}`}>
              <div className="flex items-center">
                <IconComponent className="text-xl mx-2" />
                <p className="ml-2 mr-2 max-lg:hidden">{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center cursor-pointer mb-7" onClick={Logout}>
        <TbLogout2 className="text-2xl mx-2" />
        <p className="ml-2 max-lg:hidden">Logout</p>
      </div>
    </section>
  );
};

export default BottomSideBar;
