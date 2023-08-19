"use client";

import { sidebarLinks } from "../constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";

const BottomSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-screen border-r-2 border-solid max-sm:hidden ">
      <div className="flex w-full flex-1 flex-col gap-12 px-6 mt-[100px] ">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          const IconComponent = link.icon;
          return (
            <Link href={link.route} key={link.route} className={`py-2 ${isActive && "bg-sunflower-light rounded-lg"}`}>
              <div className="flex items-center">
                <IconComponent className="text-2xl mx-2" />
                <p className="ml-2 max-lg:hidden">{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex px-6 py-2 bg-gray-500">
        <TbLogout2 className="text-2xl mx-2" />
        <p className="ml-2 max-lg:hidden">Logout</p>
      </div>
    </section>
  );
};

export default BottomSideBar;
