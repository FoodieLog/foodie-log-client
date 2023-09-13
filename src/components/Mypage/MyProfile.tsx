"use client";
import React from "react";
import { useState, useEffect } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgFlagAlt } from "react-icons/cg";
import { getThumbnails } from "../../services/mypage";
import { getMyProfile } from "@/src/services/mypage";
import { ThumbnailState, myProfileState } from "../../types/mypage";
import Link from "next/link";
import Button from "../Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import MyProfileSettings from "./MyProfileSettings";

import Header from "../Common/Header";
import Image from "next/image";

function MyPageForm({ userId, option }: { userId: number; option: string }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState<ThumbnailState[]>([]);
  const [myProfile, setMyProfile] = useState<myProfileState>({
    aboutMe: "",
    nickName: "",
    feedCount: 0,
    follower: 0,
    following: 0,
    profileImageUrl: "/images/userImage.png",
    userId: 0,
  });
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

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

  useEffect(() => {
    checkThumbnails();
    checkMyProfile();
    setIsClient(true);
    setIsLoading(false);
  }, [userId]);

  // 비동기 로딩이 완료되었는지 확인
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // myProfile이 유효한 값이 있는지 확인
  if (!myProfile) {
    return null;
  }

  if (!isClient) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const onClickProfileEdit = () => {
    setNextComponent("profileSettings");
  };

  if (nextComponent === "profileSettings") {
    return <MyProfileSettings aboutMe={myProfile.aboutMe} />;
  }

  // mx-3 my-5 flex items-center max-sm:justify-around sm:justify-center sm:gap-10
  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      <Header title={myProfile.nickName} type="left" back="prePage" option={option} />
      <main className="px-2 space-y-3">
        <header className="flex items-center mt-5 mb-3 mx-3 justify-between">
          <div className="w-[70px] h-[70px] shrink-0 rounded-full overflow-hidden cursor-pointer">
            <Image
              width={70}
              height={70}
              src={myProfile?.profileImageUrl || "/images/userImage.png"}
              alt="프로필 사진"
            />
          </div>
          <ul className="w-full flex justify-evenly">
            <li className="flex flex-col items-center justify-center">
              <p className="text-lg">{myProfile?.feedCount}</p>
              <p className="text-sm">게시물</p>
            </li>
            <li className="flex flex-col items-center justify-center">
              <p className="text-lg">{myProfile?.follower}</p>
              <p className="text-sm">팔로워</p>
            </li>
            <li className="flex flex-col items-center justify-center">
              <p className="text-lg">{myProfile?.following}</p>
              <p className="text-sm">팔로우</p>
            </li>
          </ul>
        </header>
        <div className="px-1 ">
          <p>{myProfile?.aboutMe}</p>
        </div>
        <div>
          <Button type="button" variant={"primary"} onClick={onClickProfileEdit}>
            {option === "타인" ? "팔로우" : "프로필 수정"}
          </Button>
        </div>
        <div className="flex justify-around w-full py-2 border">
          <Link href={`/main/feed/${userId}`}>
            <BiPhotoAlbum size="1.2rem" />
          </Link>
          <Link href={option === "타인" ? `/main/map/${userId}` : "/main/mypage/map"}>
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
                  <Image width={200} height={200} src={thumbnail?.thumbnailUrl} alt={`썸네일${thumbnail.id}`} />
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
