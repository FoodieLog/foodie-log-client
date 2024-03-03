"use client";
import React, { useState } from "react";
import Header from "@components/Common/Header";
import { getPasswordCode } from "@services/auth";
import { useToast } from "@/components/ui/use-toast";
import Button from "@components/Common/Button";
import PasswordCode from "@components/Auth/PasswordCode";

function PasswordAuth() {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { toast } = useToast();

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await getPasswordCode(email);
      setIsSubmit(true);
    } catch (err) {
      toast({ title: "이메일 코드 전송 실패", description: "이메일 코드 전송 실패하였습니다!\n다시 입력해 주세요!" });
    }
  };

  return (
    <div className="w-full sm:max-w-[640px] flex flex-col items-center text-gray-10 text-center">
      <Header title="" back="prePage" />
      <div className="mx-5 h-full relative">
        <h4 className="text-2xl font-semibold">비밀번호 재설정</h4>
        <p className="text-sm text-gray-3 mt-[21px]">
          {isSubmit
            ? `${email} 으로 네 자리 인증번호가 전송되었습니다. 수신된 번호를 입력 바랍니다.`
            : "새로운 비밀번호 설정을 위해 이메일 주소로 네 자리 인증번호가 전송될 예정입니다."}
        </p>
        {isSubmit ? (
          <PasswordCode email={email} />
        ) : (
          <form onSubmit={submitEmailHandler} className="mt-[37px]">
            <div className="relative">
              <input
                id="email"
                type="text"
                value={email}
                onChange={inputEmailHandler}
                className={`authInput border-1 peer`}
                placeholder=" "
              />
              <label htmlFor="email" className={`authLabel`}>
                이메일
              </label>
            </div>
            <div className="absolute bottom-5 w-full">
              <Button type="submit" variant="primary" disabled={!email}>
                다음
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PasswordAuth;
