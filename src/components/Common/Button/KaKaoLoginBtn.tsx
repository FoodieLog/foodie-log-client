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
      className="w-full p-2.5 flex items-center justify-center gap-2 text-sm text-black text-opacity-85 bg-kakao rounded-lg"
    >
      <Image src={kakaoIcon} alt="카카오 로그인" />
      <span>카카오 로그인</span>
    </button>
  );
}

export default KaKaoLoginBtn;
