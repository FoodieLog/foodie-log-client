"use client";
import { useState } from "react";
import useSignUpStore from "@store/useSignUpStore";
import { sendEmailCode, getVerificationEmail } from "@services/auth";
import AuthHeader from "@components/Common/Header/Auth";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants";
import CodeInput from "./CodeInput";
import { CodeData } from "@@types/signupTypes";

function SignUpCode() {
  const {
    setNextComponent,
    user: { email },
  } = useSignUpStore();
  const [isLoading, setIsLoading] = useState(false);
  const [codeData, setCodeData] = useState<CodeData>({
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });
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
    }
  };

  const nextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
    try {
      await getVerificationEmail(email, code);
      setNextComponent("SignUpTerms");
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
    nextButtonText: "다음",
  };

  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <AuthHeader back="preComponent" />
      <div className="title">
        <h2>인증코드</h2>
        <p>
          <span>{email || "이메일"}</span>로 전송된 인증코드를 입력해주세요!
        </p>
      </div>
      <CodeInput {...signUpData} />
    </section>
  );
}

export default SignUpCode;
