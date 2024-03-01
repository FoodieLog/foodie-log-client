"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/src/services/auth";
import { kakaoLogin } from "@/src/services/kakao";
import { initializePushNotifications } from "@/src/components/Notification/PushNotification";
import { useUserStore } from "@/src/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/src/components/Common/Button";
import Line from "@/src/components//Common/Line";
import KaKaoLoginBtn from "@/src/components/Common/Button/KaKaoLoginBtn";
import { TOAST_MESSAGES } from "@/src/constants/toast";

function LogInForm() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setTokenExpiry = useUserStore((state) => state.setTokenExpiry);
  const { LOGIN_FAILURE } = TOAST_MESSAGES;

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    kakaoLogin();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { email: logInData.email, password: logInData.password };
      const res = await logIn(body);
      setUser(res.data.response);
      const minutesInMilliseconds = 1000 * 60 * 29;
      const expiryTime = Date.now() + minutesInMilliseconds;
      setTokenExpiry(expiryTime); // 만료 시간 설정
      initializePushNotifications();
      router.replace("/main/home");
    } catch (err) {
      toast(LOGIN_FAILURE);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  return (
    <section className="w-full flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="title">
        <h2>로그인</h2>
        <p>Foodie-Log에 오신 걸 환영합니다!</p>
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 mt-10">
        <div className="relative">
          <input
            id="email"
            type="text"
            name="email"
            value={logInData.email}
            onChange={onChangeHandler}
            className={`authInput border-1 peer`}
            placeholder=""
          />
          <label htmlFor="email" className={`authLabel`}>
            이메일
          </label>
        </div>
        <div className="relative">
          <input
            id="password"
            type="password"
            name="password"
            value={logInData.password}
            onChange={onChangeHandler}
            className={`authInput border-1 peer`}
            autoComplete="off"
            placeholder=""
          />
          <label htmlFor="password" className={`authLabel`}>
            비밀번호
          </label>
        </div>
        <div className="flex flex-col items-center mt-10">
          <div className="mb-3">
            로그인 또는
            <Link href={"/accounts/signup"} className="ml-1 underline underline-offset-1">
              회원가입
            </Link>
          </div>
          <Button type="submit" variant={"primary"}>
            로그인
          </Button>
        </div>
      </form>
      <Line />
      <KaKaoLoginBtn onClick={onClickHandler} />
      <div className="flex justify-center my-10">
        <Link href={"/accounts/password"} className="underline underline-offset-1">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </section>
  );
}

export default LogInForm;
