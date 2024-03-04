"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPassword } from "@services/auth";
import { ChangePassword } from "@@types/apiTypes";
import { useToast } from "@/components/ui/use-toast";
import { PASSWORD_VALIDATION, TOAST_MESSAGES } from "@constants";
import Header from "@components/Common/Header";
import Button from "@components/Common/Button";
import ErrorText from "@components/Common/Error";

function ChangePassword({ email }: ChangePassword) {
  const { toast } = useToast();
  const router = useRouter();
  const { PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE } = TOAST_MESSAGES;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ChangePassword>({
    mode: "onChange",
  });

  const onSubmit = async ({ password }: ChangePassword) => {
    try {
      await resetPassword({ email, password });
      router.replace("/accounts/login");
      toast(PASSWORD_CHANGE_SUCCESS);
    } catch (err) {
      toast(PASSWORD_CHANGE_FAILURE);
    }
  };

  return (
    <section className="w-full sm:max-w-[640px] flex flex-col">
      <Header title="" back="prePage" />
      <div className="mx-5 h-full relative">
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
            <Button type="submit" variant={"primary"} disabled={!isValid}>
              완료
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
