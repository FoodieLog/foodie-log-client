"use client";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import Link from "next/link";
import { getPasswordCode, getVerificationEmail } from "@/src/services/auth";
import useSignUpStore from "@/src/store/useSignUpStore";
import ChangePassword from "./ChangePassword";

function FindPassword() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeData, setCodeData] = useState({
    email: "",
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });

  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const sendPasswordCodeHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await getPasswordCode(codeData.email);
      setShowCodeInput(true);
      console.log("이메일 코드 성공", res);
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    } catch (err) {
      console.log("이메일 코드 실패", err);
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
      console.log("이메일 인증 성공", res);
    } catch (err) {
      console.log("이메일 인증 실패", err);
    } finally {
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    }
  };

  if (nextComponent === "ChangePassword") {
    return <ChangePassword email={codeData.email} />;
  }

  return (
    <section className="auth">
      <BackButton />
      <div className="title">
        <h2>비밀번호 재설정</h2>
        <h4>가입한 이메일로 인증코드 보내세요!</h4>
        <form onSubmit={sendPasswordCodeHandler} className="w-full flex flex-col  gap-4 mt-10">
          <input
            name="email"
            value={codeData.email}
            onChange={onChangeHandler}
            className="input"
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
            />
            <input
              name="secondCode"
              value={codeData.secondCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
            />
            <input
              name="thirdCode"
              value={codeData.thirdCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
            />
            <input
              name="fourthCode"
              value={codeData.fourthCode}
              onChange={onChangeHandler}
              type="text"
              className="code"
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
