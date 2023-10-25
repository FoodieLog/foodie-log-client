"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { duplicateCheck, sendEmailCode } from "@/src/services/auth";
import { kakaoLogin } from "@/src/services/kakao";
import { SignUpForm } from "@/src/types/apiTypes";
import { emailValidation, passwordValidation } from "@/src/constants";
import AuthButton from "@/src/components/Common/Button/AuthButton";
import Button from "@/src/components/Common/Button";
import SignUpTerms from "@/src/components/Auth/SignUpTerms";
import SignUpCode from "@/src/components/Auth/SignUpCode";
import SignUpProfile from "@/src/components/Auth/SignUpProfile";
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
  const { toast } = useToast();

  if (nextComponent === "SignUpTerms") {
    return <SignUpTerms />;
  } else if (nextComponent === "SignUpCode") {
    return <SignUpCode />;
  } else if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }
  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    kakaoLogin();
  };
  const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = async (event) => {
    const email = event?.target.value;
    if (!errors?.email && email.trim() !== "") {
      try {
        const res = await duplicateCheck(email);
        setAvailableEmail(res.data.status);
      } catch (err) {
        setAvailableEmail(409);
      }
    }
  };

  const onSubmit = async ({ email, password }: SighUpInput) => {
    await sendEmailCode(email)
      .then((res) => {
        setNextComponent("SignUpCode");
      })
      .catch((err) =>
        toast({ title: "이메일 코드 전송 실패", description: "이메일 코드 전송 실패하였습니다!\n다시 입력해 주세요!" })
      );

    setUser({ ...user, email, password });
  };

  return (
    <section className="flex flex-col w-full items-center justify-center p-10 h-4/5 sm:w-[600px] sm:border border-gray-300">
      <div className="title">
        <h2>회원가입</h2>
        <p>맛집 정보를 이용하려면 가입하세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 mt-10">
        <div>
          <div className="relative">
            <input
              id="email"
              type="text"
              autoComplete="off"
              {...register("email", emailValidation)}
              onBlur={onBlurHandler}
              className={`authInput border-1 peer`}
              placeholder=" "
            />
            <label htmlFor="email" className={`authLabel`}>
              이메일
            </label>
          </div>
          {errors?.email ? (
            <p className="error">{errors.email.message}</p>
          ) : availableEmail === 200 ? (
            <p className="ok">사용 가능한 이메일입니다.</p>
          ) : availableEmail === 1 ? null : (
            <p className="error">이미 사용 중인 이메일입니다.</p>
          )}
        </div>
        <div>
          <div className="relative">
            <input
              className={`authInput border-1 peer`}
              type="password"
              id="password"
              placeholder=""
              maxLength={16}
              autoComplete="off"
              {...register("password", passwordValidation)}
            />
            <label htmlFor="password" className={`authLabel`}>
              비밀번호
            </label>
          </div>

          {errors?.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div>
          <div className="relative">
            <input
              className={`authInput border-1 peer`}
              type="password"
              id="password-check"
              placeholder=""
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
            <label htmlFor="password-check" className={`authLabel`}>
              비밀번호 확인
            </label>
          </div>
          {errors?.passwordCheck && <p className="error">{errors.passwordCheck.message}</p>}
        </div>
        <Link href={"/accounts/login"} className="mt-3 text-center underline underline-offset-1">
          로그인하기
        </Link>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "로딩중..." : "회원가입"}
        </Button>
      </form>
      <div className="w-full flex items-center justify-center my-10 space-x-2">
        <div className="h-[0.8px] w-full bg-slate-400" />
        <span className="w-10 flex-shrink-0 font-semibold text-gray-600 text-center text-sm">또는</span>
        <div className="h-[0.8px] w-full bg-slate-400" />
      </div>
      <AuthButton onClick={onClickHandler} />
    </section>
  );
}

export default SignUpForm;
