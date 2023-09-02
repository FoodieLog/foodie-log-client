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
import defaultImage from "@/public/images/logo_icon_only_example.png";
import useSignUpStore from "@/src/store/useSignUpStore";
import MyProfileSettings from "./MyProfileSettings";
import DropDown from "../Menu/DropDown";

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

function MyPageForm() {
  const [isClient, setIsClient] = useState(false);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [myProfile, setMyProfile] = useState<myProfile>({
    aboutMe: "",
    feedCount: 0,
    follower: 0,
    following: 0,
    profileImageUrl: "",
    userId: 0,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useUserStore((state) => state.user);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  useEffect(() => {
    setIsClient(true);
    checkThumbnails();
    checkMyProfile();
  }, [user.id]);

  const checkThumbnails = async () => {
    try {
      if (user.id) {
        const { response } = await getThumbnails(user.id, 0);
        setThumbnails(response.content);
        console.log("썸네일 성공", response.content);
      }
    } catch (error) {
      console.log("썸네일 실패", error);
    }
  };

  const checkMyProfile = async () => {
    try {
      if (user.id) {
        const { response } = await getMyProfile(user.id);
        setMyProfile(response);
        console.log("마이프로필 성공", response);
      }
    } catch (error) {
      console.log("마이프로필 실패", error);
    }
  };

  const onClickSettings = () => {
    setShowDropdown(!showDropdown);
  };

  const onClick = () => {
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
    <section className="w-full max-sm:text-base">
      <main>
        <header className="mx-3 my-5 ">
          <section className="flex items-center justify-around space-x-5">
            <div className=" w-[150px] h-[150px] border border-gray-400 rounded-full overflow-hidden cursor-pointer">
            <img src={myProfile.profileImageUrl || "/images/logo_icon_only_example.png"} alt="프로필 사진" />
              <input type="file" hidden></input>
            </div>
            <div>
              <h3 className="px-3">{user.nickName}</h3>
              <ul className="flex justify-between mt-1">
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>게시물</p>
                  <p>{myProfile.feedCount}</p>
                </li>
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>팔로워</p>
                  <p>{myProfile.follower}</p>
                </li>
                <li className="px-3 flex flex-col items-center justify-center">
                  <p>팔로우</p>
                  <p>{myProfile.following}</p>
                </li>
              </ul>
            </div>
            <DropDown name={user.nickName || "defaultName"} menuList={["설정 및 개인정보"]} />
          </section>
        </header>
        <div className="px-10">
          <p>{myProfile.aboutMe}</p>
        </div>
        <div>
          <Button type="button" variant={"primary"} onClick={onClick}>
            프로필 수정
          </Button>
        </div>
        <div className="flex justify-around w-full mt-3 py-3 border">
          <Link href={"/main/mypage"}>
            <BiPhotoAlbum size="1.6rem" />
          </Link>
          <Link href={"/main/mypage/map"}>
            <CgFlagAlt size="1.6rem" />
          </Link>
        </div>
        <article className="">
          <ul className="w-full grid grid-cols-3 gap-3">
            {thumbnails?.map((thumbnail) => (
              <li
                key={thumbnail.id}
                className="w-full h-full relative after:content-[''] after:block after:pb-[100%] border border-gray-300"
              >
                <Link href={"/"} className="w-full h-full absolute flex items-center justify-center">
                  <img src={thumbnail.thumbnailUrl} alt={`썸네일${thumbnail.id}`}></img>
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
