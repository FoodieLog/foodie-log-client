"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { duplicateCheck, sendEmailCode } from "@services/auth";
import { SignUpForm } from "@@types/apiTypes";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "@constants";
import Button from "@components/Common/Button";
import SignUpCode from "@components/Auth/SignUpCode";
import SignUpProfile from "@components/Auth/SignUpProfile";
import useSignUpStore from "@store/useSignUpStore";
import { TOAST_MESSAGES } from "@constants/toast";
import Header from "@components/Common/Header";
import SignUpTermsModal from "@components/Auth/SignUpTermsModal";
import { CheckedCircle, Eye, EyeSlash, UncheckedCircle } from "@assets/icons";
import useToggleShowPassword from "@/src/hooks/useToggleShowPassword";

interface SighUpInput {
  email: string;
  password: string;
}

function SignUpForm() {
  const [availableEmail, setAvailableEmail] = useState(1);
  const { user, setUser, nextComponent, setNextComponent } = useSignUpStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState({ service: false, info: false });
  const { toast } = useToast();
  const { EMAIL_CODE_SEND_FAILURE } = TOAST_MESSAGES;
  const [showPassword, toggleShowPassword] = useToggleShowPassword();
  const [showCheckPassword, toggleShowCheckPassword] = useToggleShowPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    mode: "onChange",
  });

  if (nextComponent === "SignUpCode") {
    return <SignUpCode />;
  } else if (nextComponent === "SignUpProfile") {
    return <SignUpProfile />;
  }

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
    try {
      await sendEmailCode(email);
      setNextComponent("SignUpCode");
      setUser({ ...user, email, password });
    } catch (err) {
      toast(EMAIL_CODE_SEND_FAILURE);
    }
  };

  const onClickAllTerms = () => {
    if (isChecked.info && isChecked.service) {
      setIsChecked({ service: false, info: false });
    } else {
      setIsChecked({ service: true, info: true });
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-between mx-5 mb-5 sm:w-[600px] sm:border border-gray-300">
      <Header title="" back="prePage" />
      <div className="title text-[24px] font-[600]">
        <p>간편하게 가입하고</p>
        <p>푸디로그 서비스를 이용하세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col flex-1 justify-between mt-10">
        <div className="gap-4 flex flex-col">
          <div>
            <div className="relative">
              <input
                id="email"
                type="text"
                autoComplete="off"
                {...register("email", EMAIL_VALIDATION)}
                onBlur={onBlurHandler}
                className={`authInput border-1 peer ${
                  errors?.email || (availableEmail !== (200 || 1) && "border-red")
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`authLabel peer-focus:${
                  errors?.email || availableEmail !== (200 || 1) ? "text-red" : "text-gray-4"
                } ${errors?.email || (availableEmail !== (200 || 1) && "text-red")}`}
              >
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
                className={`authInput border-1 peer ${errors?.password && "border-red"}`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=""
                maxLength={16}
                autoComplete="off"
                {...register("password", PASSWORD_VALIDATION)}
              />
              <label
                htmlFor="password"
                className={`authLabel peer-focus:${errors?.password ? "text-red" : "text-gray-4"} ${
                  errors?.password && "text-red"
                }`}
              >
                비밀번호
              </label>
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-[50%] translate-y-[-50%] right-[17px] cursor-pointer"
              >
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>

            {errors?.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div>
            <div className="relative">
              <input
                className={`authInput border-1 peer ${errors?.passwordCheck && "border-red"}`}
                type={showCheckPassword ? "text" : "password"}
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
              <label
                htmlFor="password-check"
                className={`authLabel peer-focus:${errors?.passwordCheck ? "text-red" : "text-gray-4"} ${
                  errors?.passwordCheck && "text-red"
                }
                }`}
              >
                비밀번호 재입력
              </label>
              <button
                type="button"
                onClick={toggleShowCheckPassword}
                className="absolute top-[50%] translate-y-[-50%] right-[17px] cursor-pointer"
              >
                {showCheckPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {errors?.passwordCheck && <p className="error">{errors.passwordCheck.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center text-gray-4">
            <label htmlFor="terms" className="flex text-gray-4 gap-2">
              {isChecked.service && isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
              <input
                id="terms"
                type="checkbox"
                checked={isChecked.service && isChecked.info}
                onChange={onClickAllTerms}
                style={{ display: "none" }}
              />
              서비스 이용 약관에 동의합니다.
            </label>
            <span
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
              className="text-[14px]"
            >
              더 알아보기
            </span>
          </div>
          <Button type="submit" variant="primary" disabled={!(isValid && isChecked.info && isChecked.service)}>
            다음
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <SignUpTermsModal isChecked={isChecked} setIsChecked={setIsChecked} setIsModalOpen={setIsModalOpen} />
      )}
    </section>
  );
}

export default SignUpForm;
