import { axiosRequest, multipartrequest } from "./index";
import { LogInBody, ResetPasswordBody } from "../types/apiTypes";

//회원가입
export const signUp = async (body: FormData) => {
  const res = await multipartrequest.post("/api/auth/signup", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("회원가입 서버 응답데이터", res);
  return res;
};

// 이메일 중복 체크
export const duplicateCheck = async (email: string) => {
  const res = await axiosRequest.get(`/api/auth/exists/email?input=${email}`);
  console.log("email 중복", res);
  return res;
};

// 로그인
export const logIn = async (body: LogInBody) => {
  const res = await axiosRequest.post("/api/auth/login", body, { withCredentials: true });
  return res;
};

// 이메일 코드 전송
export const sendEmailCode = async (email: string) => {
  console.log("email", email);
  const res = await axiosRequest.get(`/api/auth/email/code-requests/signup?email=${email}`);
  return res;
};

// 이메일 코드 인증
export const getVerificationEmail = async (email: string, code: string) => {
  console.log(email, code);
  const res = await axiosRequest.get(`/api/auth/email/verification?email=${email}&code=${code}`);
  return res;
};
// (기존 비밀번호를 잊은 경우) 비밀번호 재설정 - 이메일 코드 전송
export const getPasswordCode = async (email: string) => {
  const res = await axiosRequest.get(`/api/auth/email/code-requests/password?email=${email}`);
  console.log("비밀번호재설정", res);
  return res;
};

// (기존 비밀번호를 잊은 경우) 비밀번호 재설정
export const resetPassword = async ({ email, password }: ResetPasswordBody) => {
  console.log("axios", email, password);
  const res = await axiosRequest.put("/api/auth/password/reset", { email, password });
  return res;
};

// 카카오 코드 전송
export const sendKakaoCode = async (code: string) => {
  console.log(`sendKakaoCode`, code);
  const res = await axiosRequest.get(`/api/auth/login/kakao?code=${code}`);
  console.log("카카오 코드 응답데이터", res);
  return res;
};
