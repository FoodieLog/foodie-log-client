"use client";
import React from "react";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";

const FindPassword = () => {
  return (
    <section className="auth">
      <BackButton />
      <div className="title">
        <h2>인증코드</h2>
        <form className="w-full flex flex-col  gap-4 mt-10">
          <input className="input" placeholder="비밀번호 확인" />
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            인증코드 보내기
          </button>
        </form>
        <div className="mt-20">
          <p>
            <span>(회원님)</span>로 전송된 인증코드를 입력해주세요!
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-10">
          <input type="text" className="code" />
          <input type="text" className="code" />
          <input type="text" className="code" />
          <input type="text" className="code" />
        </div>
      </div>
      <div>
        <div className="flex justify-center mb-2">
          <button type="button" className="">
            코드 재전송
          </button>
        </div>
        <Button label="이메일인증" onClick={() => console.log("다음")} />
      </div>
      <div className="w-full flex items-center justify-center space-x-2">
        <div className="h-[0.8px] w-full bg-slate-400" />
        <span className="w-10 flex-shrink-0 font-semibold text-gray-600 text-center text-sm">또는</span>
        <div className="h-[0.8px] w-full bg-slate-400" />
      </div>
      <div className="flex justify-center mb-2">
        <button type="button" className="">
          새 계정 만들기
        </button>
      </div>
    </section>
  );
};

export default FindPassword;
