"use client";
import { useState } from "react";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import useSignUpStore from "@/src/store/useSignUpStore";
import { sendEmailCode, getVerificationEmail } from "@/src/services/auth";

const SignUpCode = () => {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const email = useSignUpStore((state) => state.user.email);
  const [codeData, setCodeData] = useState({
    firstCode: "",
    secondCode: "",
    thirdCode: "",
    fourthCode: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCodeData({ ...codeData, [name]: value });
  };
  return (
    <section className="auth">
      <BackButton />
      <div className="title">
        <h2>인증코드</h2>
        <p>
          <span>(회원님)</span>로 전송된 인증코드를 입력해주세요!
        </p>
        <div className="flex justify-center gap-2 mt-10">
          <input name="firstCode" value={codeData.firstCode} onChange={handleChange} type="text" className="code" />
          <input name="secondCode" value={codeData.secondCode} onChange={handleChange} type="text" className="code" />
          <input name="thirdCode" value={codeData.thirdCode} onChange={handleChange} type="text" className="code" />
          <input name="fourthCode" value={codeData.fourthCode} onChange={handleChange} type="text" className="code" />
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
};

export default SignUpCode;
