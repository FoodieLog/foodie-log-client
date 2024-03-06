"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useHideOnScroll from "@hooks/useHideOnScroll";
import { SearchIcon, Notifications } from "@assets/icons";
import { TextLogo } from "@/public/images";

const MainHeader = () => {
  const isVisible = useHideOnScroll();

  return (
    <section
      className={`z-20 flex w-full justify-between items-center bg-transparent max-w-[640px] pl-[20px] pr-[10px]
      sm:fixed sm:-top-2
    ${isVisible ? "fixed -top-1" : "fixed -top-16"} transition-top duration-300`}
    >
      <div>
        <Image src={TextLogo} alt="logo" className="w-[100px] h-9/12 sm:hidden cursor-pointer" />
      </div>
      <div className="flex items-center sm:hidden">
        <Link href="/main/search">
          <SearchIcon />
        </Link>
        <Link href="/main/notification">
          <Notifications />
        </Link>
      </div>
    </section>
  );
};

export default MainHeader;
