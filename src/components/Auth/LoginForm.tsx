"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@services/auth";
import { kakaoLogin } from "@services/kakao";
import { initializePushNotifications } from "@components/Notification/PushNotification";
import { useUserStore } from "@store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import Button from "@components/Common/Button";
import Line from "@components/Common/Line";
import KaKaoLoginBtn from "@components/Common/Button/KaKaoLoginBtn";
import useNotificationStore from "@/src/store/useNotificationStore";
import { TOAST_MESSAGES } from "@constants";
import { minutesInMilliseconds } from "@utils/date";

function LogInForm() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const router = useRouter();
  const { setUser, setTokenExpiry } = useUserStore();
  const { setCheckStatus } = useNotificationStore();

  const { LOGIN_FAILURE } = TOAST_MESSAGES;

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    kakaoLogin();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { email: logInData.email, password: logInData.password };
      const {
        data: { response },
      } = await logIn(body);
      const { replyFlag, followFlag, likeFlag } = response;

      setUser(response);
      setCheckStatus({ replyFlag, followFlag, likeFlag });
      setTokenExpiry(Date.now() + minutesInMilliseconds);
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
        <p className="text-center text-[24px]">
          로그인 후 <br /> 푸디로그 즐겨보세요.
        </p>
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
          <label htmlFor="email" className={`authLabel peer-focus:text-gray-4`}>
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
          <label htmlFor="password" className={`authLabel peer-focus:text-gray-4`}>
            비밀번호
          </label>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button type="submit" variant={"primary"}>
            로그인
          </Button>
          <div className="flex justify-center gap-4 my-[24px] text-[14px]">
            <Link href={"/accounts/signup"}>회원가입</Link>
            <p className="text-gray-1">|</p>
            <Link href={"/accounts/password"}>비밀번호 찾기</Link>
          </div>
        </div>
      </form>
      <Line />
      <KaKaoLoginBtn onClick={onClickHandler} />
    </section>
  );
}

export default LogInForm;
