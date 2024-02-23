import { axiosRequest } from "@services/index";
import { LogInBody, ResetPasswordBody } from "@@types/apiTypes";

//회원가입
export const signUp = async (body: FormData) => {
  const res = await axiosRequest.post("/api/auth/signup", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

// 이메일 중복 체크
export const duplicateCheck = async (email: string) => {
  const res = await axiosRequest.get(`/api/auth/exists/email?input=${email}`);

  return res;
};

// 로그인
export const logIn = async (body: LogInBody) => {
  const res = await axiosRequest.post("/api/auth/login", body, { withCredentials: true });
  return res;
};

// 이메일 코드 전송
export const sendEmailCode = async (email: string) => {
  const res = await axiosRequest.get(`/api/auth/email/code-requests/signup?email=${email}`);
  return res;
};

// 이메일 코드 인증
export const getVerificationEmail = async (email: string, code: string) => {
  const res = await axiosRequest.get(`/api/auth/email/verification?email=${email}&code=${code}`);
  return res;
};
// (기존 비밀번호를 잊은 경우) 비밀번호 재설정 - 이메일 코드 전송
export const getPasswordCode = async (email: string) => {
  const res = await axiosRequest.get(`/api/auth/email/code-requests/password?email=${email}`);

  return res;
};

// (기존 비밀번호를 잊은 경우) 비밀번호 재설정
export const resetPassword = async ({ email, password }: ResetPasswordBody) => {
  const res = await axiosRequest.put("/api/auth/password/reset", { email, password });
  return res;
};

// 닉네임 중복 체크
export const duplicateNickNameCheck = async (nickName: string) => {
  const res = await axiosRequest.get(`/api/auth/exists/nickname?input=${nickName}`);
  return res;
};
