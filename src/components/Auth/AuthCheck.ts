"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@store/useUserStore";
import { useRouter, usePathname } from "next/navigation";
import { reissueTokens } from "@services/auth";
import { useToast } from "@/components/ui/use-toast";
import useLogout from "@hooks/useLogout";
import { minutesInMilliseconds } from "@utils/date";
import { tokenLoader } from "@utils/token";
import { getKaKaoRefreshToken, logoutKaKaoToken } from "@services/kakao";

const AuthCheck: React.FC = () => {
  const { toast } = useToast();
  const { user, setUser, setTokenExpiry, clearUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();

  const isTokenExpired = user.tokenExpiry ? Date.now() > user.tokenExpiry : true;

  // 일반 로그인
  useEffect(() => {
    const validateTokens = async () => {
      const useStorage = localStorage.getItem("user-storage");

      if (useStorage) {
        const { accessToken } = JSON.parse(useStorage).state.user;

        if (!accessToken) {
          router.push("/accounts/login");
        } else {
          setUser({ accessToken });
        }
      }

      if (user.accessToken && isTokenExpired) {
        try {
          const reissueResponse = await reissueTokens();
          // 새로 발급받은 accessToken 설정
          setUser({ accessToken: reissueResponse.response.accessToken });
          setTokenExpiry(Date.now() + minutesInMilliseconds);
        } catch (error) {
          console.error("Error while reissuing tokens:", error);
          toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
          await logout();
        }
      } else if (pathname === "/") {
        router.replace("/main/home");
      }
    };

    validateTokens();
  }, [user.accessToken, user.tokenExpiry, router, pathname, isTokenExpired, setUser, setTokenExpiry]);

  // 카카오 리프레쉬 토큰 로직
  useEffect(() => {
    const kakaoRefreshToken = tokenLoader();
    const token = localStorage.getItem("kakaoRefresh");

    if (token && kakaoRefreshToken === "EXPIRED") {
      const getKakaoRefresh = async () => {
        try {
          const { data } = await getKaKaoRefreshToken(token);

          setUser({ accessToken: data.access_token });
          localStorage.setItem("kakaoRefresh", data.refresh_token);
        } catch (err) {
          toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
          await logoutKaKaoToken();
          clearUser();
        }
      };
      getKakaoRefresh();
    }
  }, [router, pathname, setUser]);

  return null;
};

export default AuthCheck;
