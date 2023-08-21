import Image from "next/image";
import { Logo } from "@/public/images";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";

const Topbar = () => {
  return (
    <section className="flex justify-between items-center max-w-[640px] px-4 bg-cyan-500">
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
