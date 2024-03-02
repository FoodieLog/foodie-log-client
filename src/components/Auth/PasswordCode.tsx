"use client";
import { useState } from "react";
import Button from "@/src/components/Common/Button";
import Link from "next/link";
import { getPasswordCode, getVerificationEmail } from "@/src/services/auth";
import useSignUpStore from "@/src/store/useSignUpStore";
import ChangePassword from "./ChangePassword";
import AuthHeader from "../Common/Header/Auth";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@/src/constants/toast";
import CodeInput from "./CodeInput";

function FindPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const { toast } = useToast();
  const { nextComponent, setNextComponent } = useSignUpStore();
  const { EMAIL_CODE_SEND_FAILURE, EMAIL_AUTH_FAILURE } = TOAST_MESSAGES;
  const [email, setEmail] = useState("");
  const [codeData, setCodeData] = useState({
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });

  const sendPasswordCodeHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await getPasswordCode(email);
      setShowCodeInput(true);
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    } catch (err) {
      toast(EMAIL_CODE_SEND_FAILURE);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerificationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
      await getVerificationEmail(email, code);
      setNextComponent("ChangePassword");
    } catch (err) {
      toast(EMAIL_AUTH_FAILURE);
    } finally {
      showCodeInput && setCodeData({ ...codeData, firstCode: "", secondCode: "", thirdCode: "", fourthCode: "" });
    }
  };

  if (nextComponent === "ChangePassword") {
    return <ChangePassword email={email} />;
  }

  const findPasswordData = {
    codeData,
    setCodeData,
    isLoading,
    onClickRetry: sendPasswordCodeHandler,
    onClickNext: onVerificationClick,
    retryButtonText: "코드 재전송",
    nextButtonText: "이메일 인증",
  };

  return (
    <section className="w-full flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <AuthHeader back="prePage" />
      <h2>비밀번호 재설정</h2>
      <h4>가입한 이메일로 인증코드 보내세요!</h4>
      <form onSubmit={sendPasswordCodeHandler} className="w-full flex flex-col gap-4 mt-10">
        <input
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="inputStyles"
          placeholder="이메일 확인"
        />
        <Button type="submit" variant={"secondary"} disabled={isLoading}>
          {isLoading ? "로딩중..." : "인증코드 보내기"}
        </Button>
        <Link href={"/accounts/signup"} className="mb-10 flex justify-center underline underline-offset-1">
          새 계정 만들기
        </Link>
      </form>

      {showCodeInput && (
        <>
          <div className="flex justify-center">
            <p>{email}로 전송된 인증코드를 입력해주세요!</p>
          </div>
          <CodeInput {...findPasswordData} />
        </>
      )}
    </section>
  );
}

export default FindPassword;
