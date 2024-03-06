"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { putChangePassword } from "@services/settings";
import { ChangePassword } from "@@types/apiTypes";
import { PASSWORD_VALIDATION } from "@constants";
import { useUserStore } from "@store/useUserStore";
import Button from "@components/Common/Button";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";
import useSignUpStore from "@store/useSignUpStore";
import CompleteChangePassword from "@components/Settings/CompleteChangePassword";
import ErrorText from "@components/Common/Error";

function SettingPassword() {
  const {
    user: { email, nickName },
  } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ChangePassword>({
    mode: "onChange",
  });
  const { nextComponent, setNextComponent } = useSignUpStore();
  const { toast } = useToast();

  const onSubmit = async ({ oldPassword, newPassword }: ChangePassword) => {
    try {
      await putChangePassword({ oldPassword, newPassword });
      setNextComponent("CompleteChangePassword");
    } catch (err) {
      toast({ description: "비밀번호 변경 실패하였습니다!" });
    }
  };

  if (nextComponent === "CompleteChangePassword") {
    return <CompleteChangePassword />;
  }

  return (
    <section className="w-full h-full sm:max-w-[640px] flex flex-col">
      <Header title="" back="prePage" />
      <div className="h-full relative mx-5">
        <h4 className="text-2xl font-semibold text-center mb-[92px]">새로운 비밀번호 입력</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
          <div>
            <div className="relative">
              <input
                id="email"
                type="text"
                value={email}
                className={`authInput border-1 peer`}
                placeholder=" "
                disabled
              />
              <label htmlFor="email" className={`authLabel`}>
                이메일 주소
              </label>
            </div>
          </div>
          <div className="relative">
            <input
              id="nickName"
              type="text"
              value={nickName}
              className={`authInput border-1 peer`}
              placeholder=" "
              disabled
            />
            <label htmlFor="nickName" className={`authLabel`}>
              닉네임
            </label>
          </div>
          <div>
            <div className="relative">
              <input
                id="originPassword"
                type="password"
                className={`authInput border-1 peer`}
                placeholder=" "
                maxLength={16}
                autoComplete="new-password"
                {...register("oldPassword", PASSWORD_VALIDATION)}
              />
              <label htmlFor="originPassword" className={`authLabel`}>
                기존 비밀번호
              </label>
            </div>
            {errors?.oldPassword && <ErrorText text={errors.oldPassword.message} />}
          </div>
          <div>
            <div className="relative">
              <input
                id="newPassword"
                type="password"
                className={`authInput border-1 peer`}
                placeholder=" "
                maxLength={16}
                autoComplete="new-password"
                {...register("newPassword", PASSWORD_VALIDATION)}
              />
              <label htmlFor="newPassword" className={`authLabel`}>
                변경할 비밀번호
              </label>
            </div>
            {errors?.newPassword && <ErrorText text={errors.newPassword.message} />}
          </div>
          <div>
            <div className="relative">
              <input
                id="newPasswordCheck"
                type="password"
                className={`authInput border-1 peer`}
                placeholder=" "
                maxLength={16}
                autoComplete="new-password"
                {...register("newPasswordCheck", {
                  required: "비밀번호는 필수 입력입니다.",
                  validate: {
                    value: (val: string | undefined) => {
                      if (watch("newPassword") !== val) return "비밀번호가 일치하지 않습니다.";
                    },
                  },
                })}
              />
              <label htmlFor="newPasswordCheck" className={`authLabel`}>
                변경할 비밀번호 확인
              </label>
            </div>
            {errors?.newPasswordCheck && <ErrorText text={errors.newPasswordCheck.message} />}
          </div>
          <div className="absolute bottom-[21px] w-full">
            <Button type="submit" variant="primary" disabled={!isValid}>
              완료
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SettingPassword;
