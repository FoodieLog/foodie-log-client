"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FatchChangePassword } from "../../services/settings";
import { ChangePassword } from "../../types/apiTypes";
import { passwordValidation } from "../../constants";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";
import Button from "../Common/Button";

function SettingPassword() {
  const email = useUserStore((state) => state.user.email);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ChangePassword>({
    mode: "onChange",
  });

  const onSubmit = async ({ oldPassword, newPassword }: ChangePassword) => {
    try {
      const res = await FatchChangePassword({ oldPassword, newPassword });
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
            <p>기존 비밀번호</p>
            <input
              type="password"
              className="input"
              placeholder="기존 비밀번호"
              maxLength={16}
              autoComplete="new-password"
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
            <Button type="submit" variant={"primary"} disabled={isSubmitting}>
              비밀번호 변경
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SettingPassword;
