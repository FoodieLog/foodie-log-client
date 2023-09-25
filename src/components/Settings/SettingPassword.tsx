"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FatchChangePassword } from "../../services/settings";
import { ChangePassword } from "../../types/apiTypes";
import { passwordValidation } from "../../constants";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";
import Button from "../Common/Button";
import Header from "../Common/Header";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const onSubmit = async ({ oldPassword, newPassword }: ChangePassword) => {
    try {
      const res = await FatchChangePassword({ oldPassword, newPassword });
      router.replace("/accounts/login");
      toast({ description: "비밀번호 변경되었습니다!\n다시 로그인해 주세요!" });
    } catch (err) {
      toast({ description: "비밀번호 변경 실패하였습니다!" });
    }
  };

  return (
    <section className="w-full sm:max-w-[640px] mx-auto space-y-10">
      <Header title="비밀번호 재설정" type="arrow" back="prePage" />
      <div className="title">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 px-2">
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
              {isSubmitting ? "로딩중..." : "비밀번호 변경"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SettingPassword;
