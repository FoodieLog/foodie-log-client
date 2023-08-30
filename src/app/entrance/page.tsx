"use client";
import Button from "@/src/components/Button";
import React from "react";
import { useRouter } from "next/navigation";

function Entrance() {
  const router = useRouter();

  return (
    <>
      <h2>Foodie-Log</h2>
      <Button variant={"primary"} onClick={(e) => console.log(e)}>
        로그인/회원가입
      </Button>
      <Button variant={"primary"} onClick={(e) => console.log(e)}>
        서비스 미리보기
      </Button>
    </>
  );
}

export default Entrance;