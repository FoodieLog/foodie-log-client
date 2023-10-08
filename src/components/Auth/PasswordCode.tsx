"use client";
import React, { useState } from "react";
import Button from "@/src/components/Common/Button";
import Link from "next/link";
import { getPasswordCode, getVerificationEmail } from "@/src/services/auth";
import useSignUpStore from "@/src/store/useSignUpStore";
import ChangePassword from "./ChangePassword";
import AuthHeader from "../Common/Header/Auth";
import { useToast } from "@/components/ui/use-toast";
function FindPassword() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeData, setCodeData] = useState({
    email: "",
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });
  const { toast } = useToast();

  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const sendPasswordCodeHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await getPasswordCode(codeData.email);
      setShowCodeInput(true);
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    } catch (err) {
      toast({ title: "이메일 인증 코드 발송 실패", description: "이메일을 다시 입력해 주세요!" });
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });
  };

  const onVerificationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
      const res = await getVerificationEmail(codeData.email, code);
      setNextComponent("ChangePassword");
    } catch (err) {
      toast({ title: "이메일 인증 실패", description: "이메일 인증 실패하였습니다. 다시 입력해 주세요!" });
    } finally {
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    }
  };

  if (nextComponent === "ChangePassword") {
    return <ChangePassword email={codeData.email} />;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto px-2">
      <AuthHeader back="prePage" />
      <div className="flex flex-col items-center">
        <h2>비밀번호 재설정</h2>
        <h4>가입한 이메일로 인증코드 보내세요!</h4>
        <form onSubmit={sendPasswordCodeHandler} className="w-full flex flex-col  gap-4 mt-10">
          <input
            name="email"
            value={codeData.email}
            onChange={onChangeHandler}
            className="inputStyles"
            placeholder="이메일 확인"
          />
          <Button type="submit" variant={"secondary"}>
            인증코드 보내기
          </Button>
          <Link href={"/accounts/signup"} className="mb-10 flex justify-center underline underline-offset-1">
            새 계정 만들기
          </Link>
        </form>
      </div>
      {showCodeInput && (
        <>
          <div className="flex justify-center">
            <p>{codeData.email}로 전송된 인증코드를 입력해주세요!</p>
          </div>
          <div className="flex justify-center gap-2 mt-10">
            <input
              name="firstCode"
              value={codeData.firstCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
              maxLength={1}
            />
            <input
              name="secondCode"
              value={codeData.secondCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
              maxLength={1}
            />
            <input
              name="thirdCode"
              value={codeData.thirdCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
              maxLength={1}
            />
            <input
              name="fourthCode"
              value={codeData.fourthCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
              maxLength={1}
            />
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Button type="button" variant={"text"} onClick={sendPasswordCodeHandler}>
                코드 재전송
              </Button>
            </div>
            <Button type="button" variant={"primary"} onClick={onVerificationClick}>
              이메일 인증
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

export default FindPassword;
