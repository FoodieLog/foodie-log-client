"use client";
import { useState, useRef } from "react";
import Button from "@/src/components/Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import { sendEmailCode, getVerificationEmail } from "@/src/services/auth";
import AuthHeader from "../Common/Header/Auth";

function SignUpCode() {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const email = useSignUpStore((state) => state.user.email);
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

  const ResendClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await sendEmailCode(email)
      .then((res) => console.log("코드 재전송 성공", res))
      .catch((err) => console.log("재전송 실패", err));
  };

  const NextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const code = codeData.firstCode + codeData.secondCode + codeData.thirdCode + codeData.fourthCode;
    await getVerificationEmail(email, code)
      .then((res) => {
        setNextComponent("SignUpTerms");
        console.log("코드 인증 성공", res);
      })
      .catch((err) => console.log("코드 인증 실패", err));
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
    <section className="auth">
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
      <div>
        <div className="flex justify-center mb-2">
          <Button type="button" variant={"text"} onClick={ResendClick}>
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
