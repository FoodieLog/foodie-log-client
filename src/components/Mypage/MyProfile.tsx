"use client";
import React from "react";
import { useState, useEffect } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgFlagAlt } from "react-icons/cg";
import { useUserStore } from "../../store/useUserStore";
import { getThumbnails } from "../../services/mypage";
import { getMyProfile } from "@/src/services/mypage";
import Link from "next/link";
import Button from "../Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import MyProfileSettings from "./MyProfileSettings";
import DropDown from "../Menu/DropDown";
import Image from "next/image";

interface Thumbnail {
  id: number;
  thumbnailUrl: string;
}

interface myProfile {
  aboutMe: string;
  feedCount: number;
  follower: number;
  following: number;
  profileImageUrl: string;
  userId: number;
}

function MyPageForm({ userId, option }: { userId: number; option: string }) {
  const [isClient, setIsClient] = useState(false);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [myProfile, setMyProfile] = useState<myProfile>({
    aboutMe: "",
    feedCount: 0,
    follower: 0,
    following: 0,
    profileImageUrl: "/images/userImage.png",
    userId: 0,
  });
  const user = useUserStore((state) => state.user);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  useEffect(() => {
    setIsClient(true);
    checkThumbnails();
    checkMyProfile();
  }, [userId]);

  const checkThumbnails = async () => {
    try {
      if (userId) {
        const { response } = await getThumbnails(userId, 0);
        setThumbnails(response.content);
        console.log("썸네일 성공", response.content);
      }
    } catch (error) {
      console.log("썸네일 실패", error);
    }
  };

  const checkMyProfile = async () => {
    try {
      if (userId) {
        const { response } = await getMyProfile(userId);
        setMyProfile(response);
        console.log("마이프로필 성공", response);
      }
    } catch (error) {
      console.log("마이프로필 실패", error);
    }
  };

  const onClickProfileEdit = () => {
    setNextComponent("profileSettings");
  };

  if (nextComponent === "profileSettings") {
    return <MyProfileSettings />;
  }

  if (!isClient) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <section className="max-sm:w-full sm:w-6/12 max-sm:text-sm p-3">
      <main>
        <header className="mx-3 my-5 flex items-center max-sm:justify-around sm:justify-center sm:gap-10">
          <div className=" w-[70px] h-[70px] border border-gray-400 rounded-full overflow-hidden cursor-pointer">
            <Image width={70} height={70} src={myProfile?.profileImageUrl || "/images/userImage.png"} alt="프로필 사진" />
            <input type="file" hidden></input>
          </div>
          <div>
            <div className="flex justify-between">
              <p>{user.nickName}</p>
              <DropDown name={user.nickName || "defaultName"} option={option} />
            </div>
            <ul className="flex gap-x-2 mt-1">
              <li className=" flex flex-col items-center justify-center">
                <p>게시물</p>
                <p>{myProfile?.feedCount}</p>
              </li>
              <li className="flex flex-col items-center justify-center">
                <p>팔로워</p>
                <p>{myProfile?.follower}</p>
              </li>
              <li className="flex flex-col items-center justify-center">
                <p>팔로우</p>
                <p>{myProfile?.following}</p>
              </li>
            </ul>
          </div>
        </header>
        <div className="px-10">
          <p>{myProfile?.aboutMe}</p>
        </div>
        <div>
          <Button type="button" variant={"primary"} onClick={onClickProfileEdit}>
            프로필 수정
          </Button>
        </div>
        <div className="flex justify-around w-full mt-3 py-3 border">
          <Link href={"/main/mypage"}>
            <BiPhotoAlbum size="1.2rem" />
          </Link>
          <Link href={option === "신고" ? `/main/map/${userId}` : "/main/mypage/map"}>
            <CgFlagAlt size="1.2rem" />
          </Link>
        </div>
        <article className="">
          <ul className="w-full grid grid-cols-3 gap-3">
            {thumbnails?.map((thumbnail) => (
              <li
                key={thumbnail.id}
                className="w-full h-full relative after:content-[''] after:block after:pb-[100%]  overflow-hidden"
              >
                <Link href={`/main/feed/${userId}`} className="w-full h-full absolute flex items-center justify-center">
                  <Image width={70} height={70} src={thumbnail?.thumbnailUrl} alt={`썸네일${thumbnail.id}`} />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </section>
  );
}

export default MyPageForm;
