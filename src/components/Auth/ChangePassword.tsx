"use client";
import React from "react";
import Image from "next/image";
import Button from "@/src/components/Button";
import kakao from "@/public/images/kakao_login_medium_wide.png";

function ChangePassword() {
  return (
    <section className="auth">
      <div className="title">
        <h2>비밀번호 재설정</h2>
        <form className="w-full flex flex-col  gap-4 mt-10">
          <p>(회원이메일)</p>
          <input className="input" placeholder="비밀번호" />
          <input className="input" placeholder="비밀번호 확인" />
          <div className="mt-20">
            <Button label={"비밀번호 변경"} onClick={(e) => console.log(e)} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
