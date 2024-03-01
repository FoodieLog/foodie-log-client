"use client";
import { useState, useRef } from "react";
import Button from "@/src/components/Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import { sendEmailCode, getVerificationEmail } from "@/src/services/auth";
import AuthHeader from "../Common/Header/Auth";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@/src/constants/toast";

function SignUpCode() {
  const {
    setNextComponent,
    user: { email },
  } = useSignUpStore();
  const [isLoading, setIsLoading] = useState(false);
  const [codeData, setCodeData] = useState({
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const { toast } = useToast();
  const { EMAIL_CODE_SEND_FAILURE, EMAIL_CODE_SEND_SUCCESS, EMAIL_CODE_AUTH_FAILURE } = TOAST_MESSAGES;

  const ResendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    await sendEmailCode(email)
      .then(() => toast(EMAIL_CODE_SEND_SUCCESS))
      .catch(() => toast(EMAIL_CODE_SEND_FAILURE))
      .finally(() => setIsLoading(false));
  };

  const NextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
    await getVerificationEmail(email, code)
      .then(() => {
        setNextComponent("SignUpTerms");
      })
      .catch(() => toast(EMAIL_CODE_AUTH_FAILURE));
    setIsLoading(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });

    if (value.length >= e.target.maxLength && focusedIndex < inputRefs.length - 1) {
      inputRefs[focusedIndex + 1].current?.focus();
      setFocusedIndex(focusedIndex + 1);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <AuthHeader back="preComponent" />
      <div className="title">
        <h2>인증코드</h2>
        <p>
          <span>{email || "이메일"}</span>로 전송된 인증코드를 입력해주세요!
        </p>
        <div className="flex justify-center gap-2 mt-10">
          <input
            name="firstCode"
            value={codeData.firstCode}
            onChange={onChangeHandler}
            type="text"
            className="code"
            maxLength={1}
            ref={inputRefs[0]}
          />
          <input
            name="secondCode"
            value={codeData.secondCode}
            onChange={onChangeHandler}
            type="text"
            className="code"
            maxLength={1}
            ref={inputRefs[1]}
          />
          <input
            name="thirdCode"
            value={codeData.thirdCode}
            onChange={onChangeHandler}
            type="text"
            className="code"
            maxLength={1}
            ref={inputRefs[2]}
          />
          <input
            name="fourthCode"
            value={codeData.fourthCode}
            onChange={onChangeHandler}
            type="text"
            className="code"
            maxLength={1}
            ref={inputRefs[3]}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center mb-2">
          <Button type="button" variant={"text"} onClick={ResendClick} disabled={isLoading}>
            코드 재전송
          </Button>
        </div>
        <Button type="button" variant={"primary"} onClick={NextClick}>
          다음
        </Button>
      </div>
    </section>
  );
}

export default SignUpCode;
