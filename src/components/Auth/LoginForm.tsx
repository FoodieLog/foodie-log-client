"use client";
import { logIn } from "@/src/services/auth";
import Image from "next/image";
import Button from "@/src/components/Button";
import kakao from "@/public/images/kakao_login_medium_wide.png";
import Line from "../Line";
import Link from "next/link";
import { ApiResponse } from "@/src/types/apiTypes";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from 'react';

function LogInForm() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email: logInData.email, password: logInData.password };

    try {
      const res = await logIn(body);
      console.log("로그인 성공", res);
      // router.replace("/main/home");
    } catch (err) {
      console.log("로그인 실패", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  console.log({ logInData });
  const handleClick = () => {
    console.log("onClick");
  };

  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="title">
        <h2>로그인</h2>
        <p>Foodie-Log에 오신 걸 환영합니다!</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col  gap-4 mt-10">
        <input
          type="text"
          name="email"
          value={logInData.email}
          onChange={handleChange}
          className="input"
          placeholder="이메일"
        />
        <input
          type="password"
          name="password"
          value={logInData.password}
          onChange={handleChange}
          className="input"
          placeholder="비밀번호"
          autoComplete="off"
        />

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
      <Button type="button" variant={"text"} size={""} onClick={handleClick}>
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
