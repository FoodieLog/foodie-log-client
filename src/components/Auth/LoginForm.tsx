"use client";
import React from "react";
import { logIn } from "@/src/services/auth";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/Common/Button";
import kakao from "@/public/images/kakao_login_medium_wide.png";
import Line from "../Common/Line";
import Link from "next/link";
import { initializePushNotifications } from "../Notification/PushNotification";

function LogInForm() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setTokenExpiry = useUserStore((state) => state.setTokenExpiry);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const body = { email: logInData.email, password: logInData.password };
      const res = await logIn(body);
      console.log("로그인 성공", res);
      setUser(res.data.response);
      console.log("");
      const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
      const expiryTime = Date.now() + oneDayInMilliseconds; // 현재 시간에 24시간을 더함
      setTokenExpiry(expiryTime); // 만료 시간 설정

      initializePushNotifications();

      router.replace("/main/home");
    } catch (err) {
      console.log("로그인 실패", err);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  const onClickHandler = () => {
    console.log("onClick");
  };

  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
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
            placeholder=" "
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
      <Button type="button" variant={"text"} size={""} onClick={onClickHandler}>
        <Image src={kakao} alt="카카오 로그인 버튼" />
      </Button>
      <div className="flex justify-center my-10">
        <Link href={"/accounts/password"} className="underline underline-offset-1">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </section>
  );
}

export default LogInForm;
