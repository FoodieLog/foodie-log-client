"use client";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import React from "react";

function SignUpTerms() {
  const onClick = () => {
    console.log("onClick");
  };
  return (
    <section className="auth">
      <BackButton />
      <div className="mb-10">
        <div className="title">
          <h2>이용약관동의</h2>
        </div>
        <p>
          Foodie-Log는 회원님의 개인정보를 안전하게 보호합니다. <br />새 계정을 만들려면 이용약관에 동의하세요.
        </p>
        <div className="flex items-center gap-x-3">
          <label htmlFor="agree">이용약관(필수)</label>
          <input className="checkbox" id="agree" type="checkbox" />
        </div>
        <p>더 알아보기</p>
      </div>
      <Button variant={"primary"} onClick={onClick}>
        다음
      </Button>
    </section>
  );
}

export default SignUpTerms;
