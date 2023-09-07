"use client";
import React from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const BackButtonMain = () => {
  const router = useRouter(); // useRouter를 사용하여 router 객체를 가져옴

  const goBack = () => {
    router.back(); // router의 back() 메서드를 사용하여 뒤로 가기
  };

  return (
    <div className=" sm:hidden">
      <button type="button" className="w-4 pl-4 my-1 align-middle " onClick={goBack}>
        <LiaAngleLeftSolid size="1.7rem" className="hover:text-orange-600" />
      </button>
    </div>
  );
};

export default BackButtonMain;
