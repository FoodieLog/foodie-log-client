"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getKaKaoToken, postKakaoToken, loginKaKaoToken } from "@/src/services/kakao";
import { useUserStore } from "@/src/store/useUserStore";
import { initializePushNotifications } from "@/src/components/Notification/PushNotification";

function KaKaoCode() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const setUser = useUserStore((state) => state.setUser);
  const setTokenExpiry = useUserStore((state) => state.setTokenExpiry);

  useEffect(() => {
    const checkUserEmail = async () => {
      if (!code) return;
      const { data } = await getKaKaoToken(code);
      console.log("카카오 토큰", data);
      await postKakaoToken(data.access_token)
        .then(async (res) => {
          console.log("카카오 이메일 중복 체크 성공", res);

          if (res.data.response.isExists) {
            await loginKaKaoToken(res.data.response.kakaoAccessToken)
              .then((res) => {
                setUser(res.data.response);
                console.log("카카오 로그인 성공", res);
                const minutesInMilliseconds = 1000 * 60 * 29;
                const expiryTime = Date.now() + minutesInMilliseconds;
                setTokenExpiry(expiryTime); // 만료 시간 설정
                initializePushNotifications();

                router.replace("/main/home");
              })
              .catch((error) => console.log("로그인에러", error));
          } else {
            router.replace("/auth/kakao");
            localStorage.setItem("kakaoToken", res.data.response.kakaoAccessToken);
          }
        })
        .catch((err) => console.log("카카오 이메일 중복 체크 실패", err));
    };
    checkUserEmail();
  }, [code]);

  return <div>KaKaoCode</div>;
}

export default KaKaoCode;
