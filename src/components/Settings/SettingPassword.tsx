"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { putChangePassword } from "@services/settings";
import { ChangePassword } from "@@types/apiTypes";
import { PASSWORD_VALIDATION, TOAST_MESSAGES } from "@constants";
import { useUserStore } from "@store/useUserStore";
import Button from "@components/Common/Button";
import Header from "@components/Common/Header";
import { useToast } from "@/components/ui/use-toast";
import useSignUpStore from "@store/useSignUpStore";
import CompleteChangePassword from "@components/Settings/CompleteChangePassword";
import ErrorText from "@components/Common/Error";
import { Eye, EyeSlash } from "@assets/icons";
import useToggelShowPassword from "@hooks/useToggleShowPassword";

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

  const [showCntPassword, toggleShowCnt] = useToggelShowPassword();
  const [showNewPassword, toggleShowNew] = useToggelShowPassword();
  const [showCheckPassword, toggleShowNewCheck] = useToggelShowPassword();

  const onSubmit = async ({ oldPassword, newPassword }: ChangePassword) => {
    try {
      await putChangePassword({ oldPassword, newPassword });
      setNextComponent("CompleteChangePassword");
    } catch (err) {
      toast(TOAST_MESSAGES.PASSWORD_CHANGE_FAILURE);
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
                type={showCntPassword ? "text" : "password"}
                className={`authInput border-1 peer ${errors?.oldPassword && "border-red"}`}
                placeholder=" "
                maxLength={16}
                autoComplete="new-password"
                {...register("oldPassword", PASSWORD_VALIDATION)}
              />
              <label
                htmlFor="originPassword"
                className={`authLabel ${errors?.oldPassword && "text-red"} peer-focus:${
                  errors?.oldPassword ? "text-red" : "text-gray-4"
                }`}
              >
                기존 비밀번호
              </label>
              <button
                type="button"
                onClick={toggleShowCnt}
                className="absolute top-[50%] translate-y-[-50%] right-[17px] cursor-pointer"
              >
                {showCntPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {errors?.oldPassword && <ErrorText text={errors.oldPassword.message} />}
          </div>
          <div>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                className={`authInput border-1 peer ${errors?.newPassword && "border-red"}`}
                placeholder=" "
                maxLength={16}
                autoComplete="new-password"
                {...register("newPassword", PASSWORD_VALIDATION)}
              />
              <label
                htmlFor="newPassword"
                className={`authLabel ${errors?.newPassword && "text-red"} peer-focus:${
                  errors?.newPassword ? "text-red" : "text-gray-4"
                }`}
              >
                변경할 비밀번호
              </label>
              <button
                type="button"
                onClick={toggleShowNew}
                className="absolute top-[50%] translate-y-[-50%] right-[17px] cursor-pointer"
              >
                {showNewPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {errors?.newPassword && <ErrorText text={errors.newPassword.message} />}
          </div>
          <div>
            <div className="relative">
              <input
                id="newPasswordCheck"
                type={showCheckPassword ? "text" : "password"}
                className={`authInput border-1 peer ${errors?.newPasswordCheck && "border-red"}`}
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
              <label
                htmlFor="newPasswordCheck"
                className={`authLabel ${errors?.newPasswordCheck && "text-red"} peer-focus:${
                  errors?.newPasswordCheck ? "text-red" : "text-gray-4"
                }`}
              >
                변경할 비밀번호 확인
              </label>
              <button
                type="button"
                onClick={toggleShowNewCheck}
                className="absolute top-[50%] translate-y-[-50%] right-[17px] cursor-pointer"
              >
                {showCheckPassword ? <Eye /> : <EyeSlash />}
              </button>
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
