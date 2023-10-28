"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter, usePathname } from "next/navigation";
import { reissueTokens } from "@/src/services/apiFeed";
import { tokenLoader } from "@/src/utils/token";
import Logout from "@/src/services/Logout";
import { useToast } from "@/components/ui/use-toast";
import { getKaKaoRefreshToken } from "@/src/services/kakao";

const AuthCheck: React.FC = () => {
  const { toast } = useToast();
  const { user, setUser, setTokenExpiry } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setTokenExpiry: state.setTokenExpiry,
  }));
  const router = useRouter();
  const pathname = usePathname();

  // const kakaoRefreshToken = tokenLoader();

  // 카카오 리프레쉬 토큰 로직
  // useEffect(() => {
  //   const token = localStorage.getItem("kakaoRefresh");
  //   if (!token) return;

  //   if (kakaoRefreshToken === "EXPIRED" && token) {
  //     const getKakaoRefresh = async () => {
  //       try {
  //         const { data } = await getKaKaoRefreshToken(token);

  //         setUser({ accessToken: data.access_token });
  //         localStorage.setItem("kakaoRefresh", data.refresh_token);
  //       } catch (err) {
  //         toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
  //         Logout();
  //       }
  //     };
  //     getKakaoRefresh();
  //   }
  // }, [kakaoRefreshToken, setUser, toast]);

  // 일반 로그인
  useEffect(() => {
    console.log("[AuthCheck] user.accessToken : ", user.accessToken);
    const validateTokens = async () => {
      if (!user.accessToken) {
        Logout();
        return;
      }

      const isTokenExpired = user.tokenExpiry ? Date.now() > user.tokenExpiry : true;

      if (isTokenExpired) {
        try {
          console.log("[AuthCheck] Token is expired, reissueTokens");
          const reissueResponse = await reissueTokens();

          if (reissueResponse.status === 201 && reissueResponse.response && reissueResponse.response.accessToken) {
            // 새로 발급받은 accessToken 설정
            setUser({ accessToken: reissueResponse.response.accessToken });

            // 새로 발급받은 accessToken의 만료 시간을 29분 후로 설정
            const minutesInMilliseconds = 1000 * 60 * 29;
            const expiryTime = Date.now() + minutesInMilliseconds;
            setTokenExpiry(expiryTime);
          } else {
            console.error(reissueResponse.error.message.accessToken);
            toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
            Logout();
          }
        } catch (error) {
          console.error("Error while reissuing tokens:", error);
          toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
          Logout();
        }
      } else if (pathname === "/") {
        router.replace("/main/home");
      }
    };

    validateTokens();
  }, [user.accessToken, user.tokenExpiry, router, pathname]);

  return null;
};

export default AuthCheck;
