"use client";
import React from "react";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";

const SignUpCode = () => {
  return (
    <section className="auth">
      <BackButton />
      <div className="title">
        <h2>인증코드</h2>
        <p>
          <span>(회원님)</span>로 전송된 인증코드를 입력해주세요!
        </p>
        <div className="flex justify-center gap-2 mt-10">
          <input type="text" className="code" />
          <input type="text" className="code" />
          <input type="text" className="code" />
          <input type="text" className="code" />
        </div>
      </div>
      <div>
        <div className="flex justify-center mb-2">
          <Button variant={"text"}>코드 재전송</Button>
        </div>
        <Button variant={"primary"}>다음</Button>
      </div>
    </section>
  );
};

export default SignUpCode;
