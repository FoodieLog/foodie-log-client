"use client";
import { useState } from "react";
import useSignUpStore from "@store/useSignUpStore";
import { sendEmailCode, getVerificationEmail } from "@services/auth";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants";
import CodeInput from "./CodeInput";
import { CodeData } from "@@types/signupTypes";
import Header from "../Common/Header";

function SignUpCode() {
  const {
    setNextComponent,
    user: { email },
  } = useSignUpStore();
  const [isLoading, setIsLoading] = useState(false);
  const initialCode = {
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  };
  const [codeData, setCodeData] = useState<CodeData>(initialCode);
  const { toast } = useToast();
  const { EMAIL_CODE_SEND_FAILURE, EMAIL_CODE_SEND_SUCCESS, EMAIL_CODE_AUTH_FAILURE } = TOAST_MESSAGES;

  const resendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendEmailCode(email);
      toast(EMAIL_CODE_SEND_SUCCESS);
    } catch (err) {
      toast(EMAIL_CODE_SEND_FAILURE);
    } finally {
      setIsLoading(false);
      setCodeData(initialCode);
    }
  };

  const nextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
    try {
      await getVerificationEmail(email, code);
      setNextComponent("SignUpProfile");
    } catch (err) {
      toast(EMAIL_CODE_AUTH_FAILURE);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpData = {
    codeData,
    setCodeData,
    isLoading,
    onClickRetry: resendClick,
    onClickNext: nextClick,
    retryButtonText: "코드 재전송",
    nextButtonText: "완료",
  };

  return (
    <section className="flex flex-col mx-5 items-center w-full sm:w-[600px] sm:border border-gray-300">
      <Header title="" back="preComponent" />
      <div className="title">
        <h2>인증코드 입력</h2>
        <p className="text-center text-[14px] text-gray-3">
          <span>{email || "이메일"}</span> 으로 <br />
          전송된 인증코드를 입력해주세요!
        </p>
      </div>
      <CodeInput {...signUpData} />
    </section>
  );
}

export default SignUpCode;
