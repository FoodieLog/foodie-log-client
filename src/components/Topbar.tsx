"use client";
import Image from "next/image";
import { Logo } from "@/public/images";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";

const Topbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    // <section className="flex justify-between items-center max-w-[640px] px-4 bg-cyan-500">
    <section
      className={`z-20 flex justify-between items-center max-w-[640px] px-4 bg-cyan-500 
    ${isVisible ? "top-0" : "-top-16"} sticky transition-top duration-300`}
    >
      <div>
        <Image src={Logo} alt="logo" className="w-[96px] h-[36px] my-2 sm:hidden cursor-pointer" />
      </div>
      <div className="flex text-3xl sm:hidden">
        <Link href="/search">
          <IoIosSearch className="mr-3 my-2 cursor-pointer " />
        </Link>
        <Link href="/notification">
          <IoMdNotificationsOutline className="my-2 cursor-pointer" />
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
