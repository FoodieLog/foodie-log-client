"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { MdAddPhotoAlternate } from "react-icons/md";
import BackButton from "../Button/BackButton";
import Button from "../Button";
import { signUp } from "@/src/services/auth";
import useSignUpStore from "@/src/store/useSignUpStore";

function SignUpProfile() {
  const [previewImage, setPreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState({
    nickName: "",
    aboutMe: "",
  });
  const user = useSignUpStore((state) => state.user);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("요청데이터", {
      content: { email: user.email, password: user.password, nickName: profile.nickName, aboutMe: profile.aboutMe },
      file: profileImage,
    });

    await signUp({
      content: { email: user.email, password: user.password, nickName: profile.nickName, aboutMe: profile.aboutMe },
      file: profileImage,
    })
      .then((res) => console.log("회원가입 성공", res))
      .catch((err) => console.log("회원가입 에러", err));
  };

  const pickImageHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      alert("파일 크기가 5MB를 초과합니다. 5MB 이하의 파일을 선택해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setProfileImage(reader?.result as string);
      setPreviewImage(e.target?.result as string);
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <form className="auth" encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
      <BackButton />
      <div className=" flex flex-col items-center justify-center">
        <div className="title">
          <h2>프로필설정</h2>
        </div>
        <div className="relative">
          <div
            onClick={pickImageHandler}
            className=" w-[200px] h-[200px] border border-gray-400 rounded-full overflow-hidden cursor-pointer"
          >
            <Image src={previewImage} alt="프로필 사진" width={200} height={200} />
            <input
              type="file"
              ref={fileInput}
              onChange={handleProfileChange}
              hidden
              accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
            ></input>
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
          <input type="text" name="nickName" value={profile.nickName} className="input" onChange={handleChange} />
        </label>
        <label>
          <p className="mb-1">자기소개</p>
          <input type="text" name="aboutMe" value={profile.aboutMe} className="input" onChange={handleChange} />
        </label>
      </div>
      <Button type="submit" variant={"primary"}>
        가입완료
      </Button>
    </form>
  );
}

export default SignUpProfile;
