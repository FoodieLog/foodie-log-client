import React from "react";
import Image from "next/image";
import kakaoIcon from "/public/images/kakaoIcon.png";

type KaKaoBtnProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function KaKaoLoginBtn({ onClick }: KaKaoBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-[10px] flex items-center justify-center gap-2 text-[15px] text-black text-opacity-85 bg-kakao rounded-[8px]"
    >
      <Image src={kakaoIcon} alt="카카오 로그인" />
      <span>카카오 로그인</span>
    </button>
  );
}

export default KaKaoLoginBtn;
