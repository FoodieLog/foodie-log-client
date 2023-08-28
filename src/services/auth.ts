import { axiosRequest, multipartrequest } from "./index";
import { SignUpBody, LogInBody, ResetPasswordBody } from "@/src/types/apiTypes";

//회원가입
export const signUp = async ({ content: { email, password, nickName, aboutMe }, file }: SignUpBody) => {
  const res = await multipartrequest.post("/auth/signup", { content: { email, password, nickName, aboutMe }, file });
  return res;
};

// 이메일 중복 체크
export const duplicateCheck = async (email: string) => {
  const res = await axiosRequest.get(`/auth/exists/email?input=${email}`);
  return res;
};

// 로그인
export const logIn = async ({ email, password }: LogInBody) => {
  const res = await axiosRequest.post("/auth/login", { email, password });
  return res;
};

// 비밀번호 재설정
export const getEmailCode = async (email: string) => {
  const res = await axiosRequest.get(`/auth/email/code-requests/password?email=${email}`);
  return res;
};
// 이메일 코드 전송
export const sendEmailCode = async (email: string) => {
  const res = await axiosRequest.get(`/auth/email/code-requests/signups?email=${email}`);
  return res;
};

// 이메일 코드 인증
export const getVerificationEmail = async (email: string, code: string) => {
  const res = await axiosRequest.get(`/auth/email/verification?email=${email}&code=${code}`);
  return res;
};

// 비밀번호 재설정
export const resetPassword = async ({ oldPassword, newPassword }: ResetPasswordBody) => {
  const res = await axiosRequest.put("/auth/password/reset", { oldPassword, newPassword });
  return res;
};
