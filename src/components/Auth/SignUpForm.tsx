"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { duplicateCheck, sendEmailCode } from "@services/auth";
import { SignUpForm } from "@@types/apiTypes";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, TERMS } from "@constants";
import Button from "@components/Common/Button";
import SignUpCode from "@components/Auth/SignUpCode";
import SignUpProfile from "@components/Auth/SignUpProfile";
import useSignUpStore from "@store/useSignUpStore";
import { TOAST_MESSAGES } from "@constants/toast";
import Header from "@components/Common/Header";
import { CheckedCircle, Eye, EyeSlash, UncheckedCircle } from "@assets/icons";
import useToggleShowPassword from "@hooks/useToggleShowPassword";
import Drawer from "@components/Common/Drawer/Drawer";
import { motion } from "framer-motion";

interface SighUpInput {
  email: string;
  password: string;
}

interface ContentVisibility {
  info: boolean;
  service: boolean;
}

function SignUpForm() {
  const [availableEmail, setAvailableEmail] = useState(1);
  const [openTermDrawer, setOpenTermDrawer] = useState(false);
  const { user, setUser, nextComponent, setNextComponent } = useSignUpStore();
  const [isChecked, setIsChecked] = useState({ service: false, info: false });
  const { toast } = useToast();
  const { EMAIL_CODE_SEND_FAILURE } = TOAST_MESSAGES;
  const [showPassword, toggleShowPassword] = useToggleShowPassword();
  const [showCheckPassword, toggleShowCheckPassword] = useToggleShowPassword();
  const [terms, setTerms] = useState<ContentVisibility>({ info: false, service: false });
  const toggleTerms = (term: keyof ContentVisibility) => {
    setTerms((prev) => ({ ...prev, [term]: !prev[term] }));
  };

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

  const onSubmit = ({ email, password }: SighUpInput) => {
    setUser({ ...user, email, password });
    setOpenTermDrawer(true);
  };

  const onTermSubmit = async () => {
    try {
      await sendEmailCode(user.email);
      setNextComponent("SignUpCode");
    } catch (err) {
      toast(EMAIL_CODE_SEND_FAILURE);
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-between px-5 pb-5 h-[100vh] overflow-hidden relative sm:w-[600px] sm:border border-gray-300">
      <Header title="" back="prePage" />
      <div className="title text-2xl font-[600]">
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
        <Button type="submit" variant="primary" disabled={!isValid}>
          다음
        </Button>
      </form>

      {openTermDrawer && (
        <Drawer backgroundDarker neverClosed reactableHeight>
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-bold mb-4">서비스 이용 약관 동의</p>
            <div className="w-full border border-gray-2 rounded-lg px-2.5 py-3.5">
              <label htmlFor="terms" className="flex items-center text-gray-4 gap-2">
                {isChecked.service && isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
                <input
                  id="terms"
                  type="checkbox"
                  checked={isChecked.service && isChecked.info}
                  onChange={() =>
                    setIsChecked(() => {
                      return isChecked.service && isChecked.info
                        ? { service: false, info: false }
                        : { service: true, info: true };
                    })
                  }
                  style={{ display: "none" }}
                />
                <p className="text-lg font-bold text-red">약관 전체 동의</p>
              </label>
            </div>
            <div className="flex justify-between w-full">
              <label htmlFor="info" className="flex text-gray-10 gap-1">
                {isChecked.info ? <CheckedCircle /> : <UncheckedCircle />}
                <input
                  id="info"
                  type="checkbox"
                  checked={isChecked.info}
                  onChange={() => setIsChecked((prev) => ({ ...prev, info: !prev.info }))}
                  style={{ display: "none" }}
                />
                <span className="text-red">(필수)</span>서비스 이용 약관 동의
              </label>
              <span
                onClick={() => {
                  toggleTerms("info");
                }}
                className="text-gray-4 text-sm"
              >
                내용 보기
              </span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: terms.info ? "120px" : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflowY: "auto" }}
            >
              <div className="h-full w-full p-3 bg-gray-1">{TERMS.INFO}</div>
            </motion.div>
            <div className="flex justify-between w-full">
              <label htmlFor="service" className="flex text-gray-10 gap-1">
                {isChecked.service ? <CheckedCircle /> : <UncheckedCircle />}
                <input
                  id="service"
                  type="checkbox"
                  checked={isChecked.service}
                  onChange={() => setIsChecked((prev) => ({ ...prev, service: !prev.service }))}
                  style={{ display: "none" }}
                />
                <span className="text-red">(필수)</span>개인정보 수집 및 이용 동의
              </label>
              <span
                onClick={() => {
                  toggleTerms("service");
                }}
                className="text-gray-4 text-sm"
              >
                내용 보기
              </span>
            </div>
            <motion.div
              initial={false}
              animate={{ height: terms.service ? "120px" : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflowY: "auto" }}
            >
              <div className="h-full w-full p-3 bg-gray-1 ">{TERMS.SERVICE.CONTENT}</div>
            </motion.div>
            <Button type="submit" onClick={onTermSubmit} disabled={!isChecked.info || !isChecked.service}>
              다음
            </Button>
          </div>
        </Drawer>
      )}
    </section>
  );
}

export default SignUpForm;
