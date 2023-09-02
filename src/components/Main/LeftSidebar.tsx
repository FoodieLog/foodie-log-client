"use client";

import { sidebarLinks } from "../../constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo, LogoIcon } from "@/public/images";
import Image from "next/image";
import Logout from './Logout';

const BottomSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-screen border-r-[1px] border-solid sticky top-0 max-sm:hidden ">
      <div className="flex w-full flex-1 flex-col gap-12 px-6 mt-6 ">
        <Image src={Logo} alt="logo" className="w-[96px] h-[24px] max-lg:hidden" />
        <Image src={LogoIcon} alt="logo" className="w-[24px] lg:hidden ml-2" />
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          const IconComponent = link.icon;
          return (
            <Link href={link.route} key={link.route} className={`py-2 ${isActive && "bg-sunflower-light rounded-lg"}`}>
              <div className="flex items-center">
                <IconComponent className="text-2xl mx-2" />
                <p className="ml-2 mr-2 max-lg:hidden">{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex px-6 py-2 mb-4">
        <Logout />
      </div>
    </section>
  );
};

export default BottomSideBar;
