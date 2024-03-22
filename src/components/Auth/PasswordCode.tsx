"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@constants";
import { getPasswordCode, getVerificationEmail } from "@services/auth";
import CodeInput from "@components/Auth/CodeInput";
import { useRouter } from "next/navigation";

interface PasswordCodeProps {
  email: string;
}

const initialCode = {
  firstCode: "",
  secondCode: "",
  thirdCode: "",
  fourthCode: "",
};

function PasswordCode({ email }: PasswordCodeProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [codeData, setCodeData] = useState(initialCode);
  const { toast } = useToast();
  const { EMAIL_CODE_SEND_FAILURE, EMAIL_AUTH_FAILURE } = TOAST_MESSAGES;

  const resendAuthCodeHandler = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await getPasswordCode(email);
      setCodeData(initialCode);
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
      router.push("/accounts/password/change");
    } catch (err) {
      toast(EMAIL_AUTH_FAILURE);
    } finally {
      setCodeData(initialCode);
    }
  };

  const findPasswordData = {
    codeData,
    setCodeData,
    isLoading,
    onClickRetry: resendAuthCodeHandler,
    onClickNext: onVerificationClick,
    retryButtonText: "재전송",
    nextButtonText: "다음",
  };

  return <CodeInput {...findPasswordData} />;
}

export default PasswordCode;
