"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/src/services/auth";
import { ChangePassword } from "@/src/types/apiTypes";
import { passwordValidation } from "@/src/constants";
import { useRouter } from "next/navigation";
import Button from "@/src/components/Common/Button";
import AuthHeader from "../Common/Header/Auth";
import { useToast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@/src/constants/toast";

function ChangePassword({ email }: ChangePassword) {
  const { toast } = useToast();
  const router = useRouter();
  const { PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE } = TOAST_MESSAGES;
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
      toast(PASSWORD_CHANGE_SUCCESS);
    } catch (err) {
      toast(PASSWORD_CHANGE_FAILURE);
    }
  };

  return (
    <section className="w-full sm:max-w-[640px] mx-auto px-10">
      <AuthHeader back="preComponent" />
      <div className="flex flex-col items-center">
        <h2>비밀번호 재설정</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col  gap-4 mt-10">
          <label>
            <p>회원이메일</p>
            <input type="text" className="inputStyles" value={email} disabled />
          </label>
          <label>
            <p>변경할 비밀번호</p>
            <input
              type="password"
              className="inputStyles"
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
              className="inputStyles"
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
              {isSubmitting ? "로딩중..." : "비밀번호 변경"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
