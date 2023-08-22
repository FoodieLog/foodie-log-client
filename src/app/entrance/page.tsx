"use client";
import Button from "@/src/components/Button";
import React from "react";
import { useRouter } from "next/navigation";

function Entrance() {
  const router = useRouter();

  return (
    <>
      <h2>Foodie-Log</h2>
      <Button label={"로그인/회원가입"} onClick={(e) => console.log(e)} />
      <Button label={"서비스 미리보기"} onClick={(e) => console.log(e)} />
    </>
  );
}

export default Entrance;
