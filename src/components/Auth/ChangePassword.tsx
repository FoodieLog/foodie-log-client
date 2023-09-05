"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/src/services/auth";
import { ChangePassword } from "@/src/types/apiTypes";
import { passwordValidation } from "@/src/constants";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Button";

function ChangePassword({ email }: ChangePassword) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ChangePassword>({
    mode: "onChange",
  });

  const onSubmit = async ({ password }: ChangePassword) => {
    try {
      const res = await resetPassword({ email, password });
      router.replace("/accounts/login");
      console.log("비밀번호 재설정", res);
    } catch (err) {
      console.log("비밀번호 재설정 실패", err);
    }
  };

  return (
    <section className="auth">
      <div className="title">
        <h2>비밀번호 재설정</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 mt-10">
          <label>
            <p>회원이메일</p>
            <input type="text" className="input" value={email} disabled />
          </label>
          <label>
            <p>변경할 비밀번호</p>
            <input
              type="password"
              className="input"
              placeholder="변경할 비밀번호"
              maxLength={16}
              autoComplete="new-password"
              {...register("password", passwordValidation)}
            />
            {errors?.password && <span>{errors.password.message}</span>}
          </label>
          <label>
            <p>변경할 비밀번호 확인</p>
            <input
              type="password"
              id="newPasswordCheck"
              className="input"
              placeholder="변경할 비밀번호 확인"
              autoComplete="off"
              maxLength={16}
              {...register("newPasswordCheck", {
                required: "비밀번호는 필수 입력입니다.",
                validate: {
                  value: (val: string | undefined) => {
                    if (watch("password") !== val) return "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
            />
            {errors?.newPasswordCheck && <span>{errors.newPasswordCheck.message}</span>}
          </label>
          <div className="mt-20">
            <Button type="submit" variant={"primary"} disabled={isSubmitting}>
              비밀번호 변경
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
