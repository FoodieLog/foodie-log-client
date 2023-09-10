"use client";
import React from "react";
import Image from "next/image";
import { TextLogo } from "@/public/images";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import useHideOnScroll from "../../hooks/useHideOnScroll";

const Topbar = () => {
  const isVisible = useHideOnScroll();

  return (
    // <section className="flex justify-between items-center max-w-[640px] px-4 bg-cyan-500">
    <section
      className={`z-20 flex w-full justify-between items-center bg-white max-w-[640px] px-4 pt-2 pb-1  
    ${isVisible ? "fixed top-0" : "fixed -top-16"} transition-top duration-300`}
    >
      <div>
        <Image src={TextLogo} alt="logo" className="w-[100px] h-9/12 sm:hidden cursor-pointer" />
      </div>
      <div className="flex gap-x-2 text-3xl sm:hidden">
        <Link href="/main/search">
          <IoIosSearch className="cursor-pointer hover:text-coral mr-2" />
        </Link>
        <Link href="/main/notification">
          <IoMdNotificationsOutline className="cursor-pointer hover:text-coral mr-2" />
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
