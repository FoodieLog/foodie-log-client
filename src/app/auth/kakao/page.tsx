"use client";
import { useSearchParams } from "next/navigation";
import Button from "@/src/components/Common/Button";
import useSignUpStore from "@/src/store/useSignUpStore";
import SignUpProfile from "@/src/components/Auth/SignUpProfile";
import AuthHeader from "@/src/components/Common/Header/Auth";
import { loginKaKaoToken } from "@/src/services/kakao";
import { useUserStore } from "@/src/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";

function KaKaoSignUpTerms() {
  const isChecked = useSignUpStore((state) => state.isChecked);
  const setIsChecked = useSignUpStore((state) => state.setIsChecked);
  const nextComponent = useSignUpStore((state) => state.nextComponent);
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const setUser = useUserStore((state) => state.setUser);
  const { toast } = useToast();

  const onChangeHandler = () => {
    setIsChecked(!isChecked);
  };

  const onClickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    const kakaoToken = localStorage.getItem("kakaoToken");

    if (isChecked && kakaoToken) {
      await loginKaKaoToken(kakaoToken)
        .then((res) => {
          setNextComponent("SignUpProfile");
          setUser(res.data.response);
        })
        .catch((err) => toast({ description: "카카오 인증이 만료되었습니다." }));
    } else if (!isChecked) {
      toast({ description: "푸디로그 이용약관동의는 필수입니다." });
    }
  };

  if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }

  return (
    <section className="auth">
      <AuthHeader back="preComponent" />
      <div className="mb-10">
        <div className="title">
          <h2>이용약관동의</h2>
        </div>
        <p>
          Foodie-Log는 회원님의 개인정보를 안전하게 보호합니다. <br />새 계정을 만들려면 이용약관에 동의하세요.
        </p>
        <div className="flex items-center gap-x-3">
          <label htmlFor="agree">이용약관(필수)</label>
          <input className="checkbox" id="agree" type="checkbox" checked={isChecked} onChange={onChangeHandler} />
        </div>
        <p>더 알아보기</p>
      </div>
      <Button type="button" variant={"primary"} onClick={onClickHandler}>
        다음
      </Button>
    </section>
  );
}

export default KaKaoSignUpTerms;
