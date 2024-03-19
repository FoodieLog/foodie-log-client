import { axiosRequest, kakaoRequest, userRequest, kakaoLogoutRequest } from "@services";

//카카오 로그인
export const kakaoLogin = async () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 코드 전송
export const sendKakaoCode = (code: string) => {
  const res = axiosRequest.get(`/api/auth/login/kakao?code=${code}`);

  return res;
};

// 카카오 토큰 발급
export const getKaKaoToken = async (code: string) => {
  const res = await kakaoRequest.post("https://kauth.kakao.com/oauth/token", {
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_REST_API_KEY, // REST_API_KEY 변수를 사용하세요.
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI, // REDIRECT_URI 변수를 사용하세요.
    code,
  });
  return res;
};

// 카카오 이메일 중복 체크 - 카카오 토큰 전송
export const postKakaoToken = async (token: string) => {
  const res = await axiosRequest.get(`/api/auth/exists/kakao?token=${token}`);
  return res;
};

// 카카오 로그인
export const loginKaKaoToken = async (token: string) => {
  const res = await axiosRequest.get(`/api/auth/login/kakao?token=${token}`);
  return res;
};

// 카카오 로그아웃
export const logoutKaKaoToken = async () => {
  const res = await kakaoLogoutRequest.post(`/logout`);
  return res;
};

// 프로필 설정
export const profileSetting = async (body: FormData) => {
  const res = await userRequest.put("/api/user/setting/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });

  return res;
};

//카카오 회원 탈퇴
export const unlinkKaKaoToken = async () => {
  const res = await kakaoLogoutRequest.post(`/unlink`);
  return res;
};

// 카카오 토큰 발급
export const getKaKaoRefreshToken = async (token: string) => {
  const res = await kakaoRequest.post("https://kauth.kakao.com/oauth/token", {
    grant_type: "refresh_token",
    client_id: process.env.NEXT_PUBLIC_REST_API_KEY, // REST_API_KEY 변수를 사용하세요.
    refresh_token: token,
  });

  return res;
};
