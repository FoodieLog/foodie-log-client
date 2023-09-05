import { axiosRequest, multipartrequest } from "./index";
import useKakaoStore from "../store/useKakaoStore";

//카카오 로그인
export const kakaoLogin = async () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 코드 전송
export const sendKakaoCode = (code: string) => {
  console.log(`sendKakaoCode`, code);
  const res = axiosRequest.get(`/api/auth/login/kakao?code=${code}`);
  console.log("카카오 코드 응답데이터", res);
  return res;
};

// 프로필 설정
export const profileSetting = async (body: FormData) => {
  const res = await multipartrequest.post("​api/auth/​/user​/setting​/profile", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("프로필 서버 응답데이터", res);
  return res;
};
