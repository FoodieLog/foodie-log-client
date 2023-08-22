"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { MdAddPhotoAlternate } from "react-icons/md";
import BackButton from "../Button/BackButton";
import Button from "../Button";
const SignUpProfile = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const fileInput = useRef(null);

  const onClick = () => {
    console.log("onClick");
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };
  return (
    <section className="auth">
      <BackButton />
      <div className=" flex flex-col items-center justify-center">
        <div className="title">
          <h2>프로필설정</h2>
        </div>
        <div
          onClick={() => fileInput?.current?.click()}
          className="relative w-[200px] h-[200px] border border-gray-300 rounded-full cursor-pointer"
        >
          <Image src={selectedFile} alt="프로필 사진" width={200} height={200} />
          <div onClick={() => fileInput?.current?.click()} className="absolute bottom-0 right-0 cursor-pointer">
            <MdAddPhotoAlternate size="2rem" className="text-gray-600 z-10" />
          </div>
          <input type="file" ref={fileInput} onChange={addImageToPost} hidden></input>
        </div>
      </div>

      <label>
        <p className="mb-1">
          닉네임(계정아이디)<span className="text-red-500">*</span>
        </p>
        <input type="text" className="input" />
      </label>
      <label>
        <p className="mb-1">자기소개</p>
        <input type="text" className="input" />
      </label>

      <Button label="가입완료" onClick={onClick} />
    </section>
  );
};

export default SignUpProfile;
