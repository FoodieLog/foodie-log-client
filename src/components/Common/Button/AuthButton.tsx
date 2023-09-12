import React from "react";
import Image from "next/image";
import kakaoIcon from "/public/images/kakaoIcon.png";

function AuthButton() {
  return (
    <button
      type="button"
      className="w-full py-3.5 gap-x-1.5 flex items-center justify-center gap-2 text-[15px] text-black text-opacity-85 bg-kakao-container rounded-xl"
    >
      <Image src={kakaoIcon} alt="카카오 로그인" />
      <span>카카오 로그인</span>
    </button>
  );
}

export default AuthButton;
