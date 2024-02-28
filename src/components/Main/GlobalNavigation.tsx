"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { globalNavigation } from "@constants";

function GlobalNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-screen-sm mx-auto h-[101px] z-10 border-t-[1px] bg-gray-0 border-solid sm:hidden pb-[21px]">
      <ul className="h-full flex px-2.5">
        {globalNavigation.map((link) => {
          const isActive = link.route && pathname.includes(link.route);
          return (
            <li key={link.route} className="w-full flex justify-center">
              <Link href={link.route} className="flex flex-col items-center justify-center">
                <Image src={isActive ? link.icon_checked : link.icon} alt={link.route} className="mb-[11px]" />
                <p className={`text-xs font-semibold ${isActive ? "text-red" : "text-gray-3"}`}>{link.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default GlobalNavigation;
