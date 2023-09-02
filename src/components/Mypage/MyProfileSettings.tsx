"use client";
import React from "react";
import { useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { profileSetting } from "@/src/services/mypage";
import Image from "next/image";
import BackButton from "../Button/BackButton";
import Button from "../Button";
import { useUserStore } from "@/src/store/useUserStore";

function MyProfileSettings() {
  const user = useUserStore((state) => state.user);
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const [profile, setProfile] = useState({
    nickName: user.nickName,
    aboutMe: "",
  });
  const fileInput = useRef<HTMLInputElement>(null);

  // 프로필 설정 api
  const ProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const userData = {
      nickName: profile.nickName,
      aboutMe: profile.aboutMe,
    };

    const blob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("content", blob);
    formData.append("file", profileImage as File);

    await profileSetting(formData)
      .then((res) => console.log("프로필 성공", res))
      .catch((err) => console.log("프로필 에러", err));
  };

  // ref 클릭
  const pickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // 이미지 파일 입력
  const ProfileChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 3) {
      alert("파일 크기가 3MB를 초과합니다. 3MB 이하의 파일을 선택해주세요.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileImage(file);
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <form id="formElem" className="auth" method="post" onSubmit={ProfileSubmit}>
      <BackButton />
      <div className=" flex flex-col items-center justify-center">
        <div className="title">
          <h2>프로필설정</h2>
        </div>
        <div className="relative">
          <div
            onClick={pickImageHandler}
            className="flex justify-center items-center w-[200px] h-[200px] border border-gray-400 rounded-full overflow-hidden cursor-pointer"
          >
            <Image
              src={user.profileImageUrl ? user.profileImageUrl : previewImage}
              alt="프로필 사진"
              width={200}
              height={200}
            />
            <input
              type="file"
              ref={fileInput}
              onChange={ProfileChangehandler}
              hidden
              accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
            />
          </div>
          <div onClick={pickImageHandler} className="absolute bottom-5 right-0 cursor-pointer">
            <MdAddPhotoAlternate size="2.5rem" className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <label>
          <p className="mb-1">
            닉네임(계정아이디)<span className="text-red-500">*</span>
          </p>
          <input type="text" name="nickName" value={profile.nickName} className="input" onChange={onChangeHandler} />
        </label>
        <label>
          <p className="mb-1">자기소개</p>
          <input type="text" name="aboutMe" value={profile.aboutMe} className="input" onChange={onChangeHandler} />
        </label>
      </div>
      <div className="my-10">
        <Button type="submit" variant={"primary"}>
          프로필 설정
        </Button>
      </div>
    </form>
  );
}

export default MyProfileSettings;