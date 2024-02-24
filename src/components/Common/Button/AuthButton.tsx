import React from "react";
import Image from "next/image";
import kakaoIcon from "/public/images/kakaoIcon.png";

type KaKaoBtnProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function AuthButton({ onClick }: KaKaoBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3.5 gap-x-1.5 flex items-center justify-center gap-2 text-[15px] text-black text-opacity-85 bg-kakao rounded-xl"
    >
      <Image src={kakaoIcon} alt="카카오 로그인" />
      <span>카카오 로그인</span>
    </button>
  );
}

export default AuthButton;
