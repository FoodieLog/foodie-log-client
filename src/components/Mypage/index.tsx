"use client";
import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgFlagAlt } from "react-icons/cg";
import { useUserStore } from "@/src/store/useUserStore";
import { getThumbnails } from "@/src/services/mypage";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo_example.png";
import Button from "../Button";
import defaultImage from "@/public/images/logo_icon_only_example.png";

function MyPageForm() {
  const [isClient, setIsClient] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setIsClient(true);
    const checkThumbnails = async () => {
      try {
        if (user.id) {
          const res = await getThumbnails(user.id);
          console.log("썸네일 성공", res);
        }
      } catch (error) {
        console.log("썸네일 실패", error);
      }
    };
    checkThumbnails();
  }, [user.id]);

  const onClick = () => {
    console.log("onClick");
  };

  if (!isClient) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <section className="w-full max-sm:text-base">
      <main>
        <header className="mx-3 my-5 ">
          <section className="flex items-center justify-around space-x-5">
            <div className=" w-[150px] h-[150px] border border-gray-400 rounded-full overflow-hidden cursor-pointer">
              <Image
                src={user.profileImageUrl ? user.profileImageUrl : defaultImage}
                alt="프로필 사진"
                width={150}
                height={150}
                placeholder="blur"
              />
              <input type="file" hidden></input>
            </div>
            <div>
              <h3 className="px-3">{user.nickName}</h3>
              <ul className="flex justify-between mt-1">
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>게시물</p>
                  <p>5</p>
                </li>
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>팔로워</p>
                  <p>100</p>
                </li>
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>팔로우</p>
                  <p>200</p>
                </li>
              </ul>
            </div>
            <BsThreeDotsVertical size="1.2rem" className="" />
          </section>
        </header>
        <div className="px-10">
          <h1></h1>
        </div>
        <div>
          <Button type="button" variant={"primary"} onClick={onClick}>
            프로필 수정
          </Button>
        </div>
        <div className="flex justify-around w-full mt-3 py-3 border">
          <Link href={"#"}>
            <BiPhotoAlbum size="1.6rem" />
          </Link>
          <Link href={"#"}>
            <CgFlagAlt size="1.6rem" />
          </Link>
        </div>
        <article className="">
          <ul className="w-full grid grid-cols-3 gap-3">
            <li className="w-full h-full relative after:content-[''] after:block after:pb-[100%] border border-gray-300">
              <Link href={"/"} className="w-full h-full absolute flex items-center justify-center">
                <Image src={logo} alt="사진이미지" width={500} height={100} />
              </Link>
            </li>
            <li className="w-full h-full relative after:content-[''] after:block after:pb-[100%] border border-gray-300">
              <Link href={"/"} className="w-full h-full absolute flex items-center justify-center">
                <Image src={logo} alt="사진이미지" width={500} height={100} />
              </Link>
            </li>
            <li className="w-full h-full relative after:content-[''] after:block after:pb-[100%] border border-gray-300">
              <Link href={"/"} className="w-full h-full absolute flex items-center justify-center">
                <Image src={logo} alt="사진이미지" width={500} height={100} />
              </Link>
            </li>
            <li className="w-full h-full relative after:content-[''] after:block after:pb-[100%] border border-gray-300">
              <Link href={"/"} className="w-full h-full absolute flex items-center justify-center">
                <Image src={logo} alt="사진이미지" width={500} height={100} />
              </Link>
            </li>
          </ul>
        </article>
      </main>
    </section>
  );
}

export default MyPageForm;
