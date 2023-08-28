"use client";

import Button from "@/src/components/Button";
import BackButton from "@/src/components/Button/BackButton";
import useSignUpStore from "@/src/store/useSignUpStore";

function SignUpTerms() {
  const isChecked = useSignUpStore((state) => state.isChecked);
  const setIsChecked = useSignUpStore((state) => state.setIsChecked);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChecked) {
      setNextComponent("SignUpProfile");
    }
  };

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
        다음
      </Button>
    </section>
  );
}

export default SignUpTerms;
