"use client";
import { useState } from "react";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import Line from "../Line";
import Link from "next/link";
import { getEmailCode, getVerificationEmail } from "@/src/services/auth";
import useSignUpStore from "@/src/store/useSignUpStore";
import ChangePassword from "./ChangePassword";

const FindPassword = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await getEmailCode(codeData.email)
      .then((res) => {
        setShowCodeInput(true);
        console.log("이메일 코드 성공", res);
      })
      .catch((err) => console.log("이메일 코드 실패", err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });
  };

  const handleResendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await getEmailCode(codeData.email)
      .then((res) => {
        console.log("이메일 코드 재전송", res);
      })
      .catch((err) => console.log("이메일 코드 재전송 실패", err));
  };

  const handleVerificationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
    await getVerificationEmail(codeData.email, code)
      .then((res) => {
        setNextComponent("ChangePassword");
        console.log("이메일 인증 성공", res);
      })
      .catch((err) => console.log("이메일 인증 실패", err));
  };

  if (nextComponent === "ChangePassword") {
    return <ChangePassword />;
  }
  return (
    <section className="auth">
      <BackButton />
      <div className="title">
        <h2>비밀번호 재설정</h2>
        <h4>가입한 이메일로 인증코드 보내세요!</h4>
        <form onSubmit={handleSubmit} className="w-full flex flex-col  gap-4 mt-10">
          <input
            name="email"
            value={codeData.email}
            onChange={handleChange}
            className="input"
            placeholder="이메일 확인"
          />
          <Button type="submit" variant={"secondary"}>
            인증코드 보내기
          </Button>
        </form>
      </div>
      {showCodeInput && (
        <>
          <div className="flex justify-center">
            <p>{codeData.email}로 전송된 인증코드를 입력해주세요!</p>
          </div>
          <div className="flex justify-center gap-2 mt-10">
            <input name="firstCode" value={codeData.firstCode} onChange={handleChange} type="text" className="code" />
            <input name="secondCode" value={codeData.secondCode} onChange={handleChange} type="text" className="code" />
            <input name="thirdCode" value={codeData.thirdCode} onChange={handleChange} type="text" className="code" />
            <input name="fourthCode" value={codeData.fourthCode} onChange={handleChange} type="text" className="code" />
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Button type="button" variant={"text"} onClick={handleResendClick}>
                코드 재전송
              </Button>
            </div>
            <Button type="button" variant={"primary"} onClick={handleVerificationClick}>
              이메일 인증
            </Button>
          </div>
          <Line />
          <Link href={"/accounts/signup"} className="mb-10 flex justify-center underline underline-offset-1">
            새 계정 만들기
          </Link>
        </>
      )}
    </section>
  );
};

export default FindPassword;
