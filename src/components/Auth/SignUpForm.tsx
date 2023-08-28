"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/Button";
import kakao from "@/public/images/kakao_login_medium_wide.png";
import { useForm } from "react-hook-form";
import { duplicateCheck, sendEmailCode } from "@/src/services/auth";
import { SignUpForm } from "@/src/types/apiTypes";
import { emailValidation, passwordValidation } from "@/src/constants";
import SignUpTerms from "./SignUpTerms";
import SignUpCode from "./SignUpCode";
import SignUpProfile from "./SignUpProfile";
import useSignUpStore from "@/src/store/useSignUpStore";

interface SighUpInput {
  email: string;
  password: string;
}

function SignUpForm() {
  const [availableEmail, setAvailableEmail] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    mode: "onChange",
  });

  const { user, setUser, isChecked, nextComponent, setNextComponent } = useSignUpStore();

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = async (event) => {
    const email = event?.target.value;
    if (!errors?.email && email.trim() !== "") {
      try {
        const res = await duplicateCheck(email);
        console.log("이메일 중복 체크", res);
        setAvailableEmail(res.data.status);
      } catch (err) {
        console.log("이메일 중복 에러", err);
      }
    }
  };
  const onSubmit = async ({ email, password }: SighUpInput) => {
    await sendEmailCode(email)
      .then((res) => {
        console.log("이메일코드 전송성공", res);
      })
      .catch((err) => console.log("이메일코드 전송실패", err));
    setNextComponent("SignUpCode");
    setUser({ ...user, email, password });
  };
  console.log("zus", user);

  if (nextComponent === "SignUpTerms") {
    return <SignUpTerms />;
  } else if (nextComponent === "SignUpCode") {
    return <SignUpCode />;
  } else if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }

  return (
    <section className="flex flex-col items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="title">
        <h2>회원가입</h2>
        <p>맛집 정보를 이용하려면 가입하세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 mt-10">
        <div>
          <input
            className="input"
            id="email"
            type="text"
            placeholder="이메일"
            autoComplete="off"
            {...register("email", emailValidation)}
            onBlur={handleBlur}
          />
          {errors?.email ? (
            <p>{errors.email.message}</p>
          ) : availableEmail === 200 ? (
            <p>사용 가능한 이메일입니다.</p>
          ) : availableEmail === 1 ? null : (
            <p>이미 사용하는 이메일입니다.</p>
          )}
        </div>
        <div>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="비밀번호"
            maxLength={16}
            autoComplete="off"
            {...register("password", passwordValidation)}
          />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <input
            className="input"
            type="password"
            id="password-check"
            placeholder="비밀번호 확인"
            autoComplete="off"
            maxLength={16}
            {...register("passwordCheck", {
              required: "비밀번호는 필수 입력입니다.",
              validate: {
                value: (val: string | undefined) => {
                  if (watch("password") !== val) return "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          />
          {errors?.passwordCheck && <p>{errors.passwordCheck.message}</p>}
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          회원가입
        </Button>
      </form>
      <div className="w-full flex items-center justify-center my-10 space-x-2">
        <div className="h-[0.8px] w-full bg-slate-400" />
        <span className="w-10 flex-shrink-0 font-semibold text-gray-600 text-center text-sm">또는</span>
        <div className="h-[0.8px] w-full bg-slate-400" />
      </div>
      <button type="button" className="">
        <Image src={kakao} alt="카카오 로그인 버튼" />
      </button>
    </section>
  );
}

export default SignUpForm;
