"use client";
import React from "react";
import Button from "@/src/components/Common/Button";
import { useRouter } from "next/navigation";

function Entrance() {
  const router = useRouter();

  return (
    <>
      <h2>Foodie-Log</h2>
      <Button type="button" variant={"primary"} onClick={(e) => console.log(e)}>
        로그인/회원가입
      </Button>
      <Button type="button" variant={"primary"} onClick={(e) => console.log(e)}>
        서비스 미리보기
      </Button>
    </>
  );
}

export default Entrance;
