"use client";
import { useSearchParams } from "next/navigation";
import { sendKakaoCode } from "@/src/services/kakao";
import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import useSignUpStore from "@/src/store/useSignUpStore";
import useKakaoStore from "@/src/store/useKakaoStore";
import SignUpProfile from "./SignUpProfile";
import { useEffect } from "react";

function SignUpTerms() {
  const isChecked = useSignUpStore((state) => state.isChecked);
  const setIsChecked = useSignUpStore((state) => state.setIsChecked);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const setCode = useKakaoStore((state) => state.setCode);

  const params = useSearchParams();
  const code = params.get("code");

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChecked) {
      setNextComponent("SignUpProfile");
    }
  };

  // const kaKaoClick = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (!code) return;
  //   console.log("Click", code);
  //   await sendKakaoCode(code)
  //     .then((res) => {
  //       setNextComponent("SignUpProfile");
  //       console.log(code);
  //       console.log("카카오 코드 전송 성공", res);
  //     })
  //     .catch((err) => console.log("Error", err));
  // };

  if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }

  return (
    <section className="auth">
      <BackButton />
      <div className="mb-10">
        <div className="title">
          <h2>이용약관동의</h2>
        </div>
        <p>
          Foodie-Log는 회원님의 개인정보를 안전하게 보호합니다. <br />새 계정을 만들려면 이용약관에 동의하세요.
        </p>
        <div className="flex items-center gap-x-3">
          <label htmlFor="agree">이용약관(필수)</label>
          <input className="checkbox" id="agree" type="checkbox" checked={isChecked} onChange={handleChange} />
        </div>
        <p>더 알아보기</p>
      </div>
      <Button type="button" variant={"primary"} onClick={handleClick}>
        {code ? "가입완료" : "다음"}
      </Button>
    </section>
  );
}

export default SignUpTerms;