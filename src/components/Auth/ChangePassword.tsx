"use client";
import React from "react";
import Button from "@/src/components/Button";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/src/services/auth";
import { ResetPasswordBody, ResetPasswordForm } from "@/src/types/apiTypes";
import { passwordValidation } from "@/src/constants";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ResetPasswordForm>({
    mode: "onChange",
  });

  const onSubmit = async ({ oldPassword, newPassword }: ResetPasswordBody) => {
    await resetPassword({ oldPassword, newPassword })
      .then((res) => console.log("비밀번호 재설정", res))
      .catch((res) => console.log("비밀번호 재설정 실패", res));
  };

  return (
    <section className="auth">
      <div className="title">
        <h2>비밀번호 재설정</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 mt-10">
          <p>(회원이메일)</p>
          <label>
            <p>기존 비밀번호</p>
            <input
              type="password"
              className="input"
              placeholder="기존 비밀번호"
              maxLength={16}
              autoComplete="current-password"
              {...register("oldPassword", passwordValidation)}
            />
            {errors?.oldPassword && <span>{errors.oldPassword.message}</span>}
          </label>
          <label>
            <p>변경할 비밀번호</p>
            <input
              type="password"
              className="input"
              placeholder="변경할 비밀번호"
              maxLength={16}
              autoComplete="new-password"
              {...register("newPassword", passwordValidation)}
            />
            {errors?.newPassword && <span>{errors.newPassword.message}</span>}
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
                    if (watch("newPassword") !== val) return "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
            />
            {errors?.newPasswordCheck && <span>{errors.newPasswordCheck.message}</span>}
          </label>
          <div className="mt-20">
            <Button type="submit" variant={"primary"}>
              비밀번호 변경
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
