"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@store/useUserStore";
import { useRouter, usePathname } from "next/navigation";
import { reissueTokens } from "@services/auth";
import { useToast } from "@/components/ui/use-toast";
import useLogout from "@hooks/useLogout";
import { minutesInMilliseconds } from "@utils/date";
import { getKaKaoRefreshToken, logoutKaKaoToken } from "@services/kakao";
import { TOAST_MESSAGES } from "@/src/constants";
import useLocalStorage from "@/src/hooks/useLocalStorage";

const AuthCheck: React.FC = () => {
  const { toast } = useToast();
  const { user, setUser, setTokenExpiry, clearUser } = useUserStore();
  const { getItem, removeItem } = useLocalStorage();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();

  const isTokenExpired = user.tokenExpiry ? Date.now() > user.tokenExpiry : true;

  const kakaoRefreshToken = getItem("kakaoRefresh");

  useEffect(() => {
    const reissue = async () => {
      if (kakaoRefreshToken) {
        try {
          const { data } = await getKaKaoRefreshToken(kakaoRefreshToken);

          setUser({ accessToken: data.access_token });
          localStorage.setItem("kakaoRefresh", data.refresh_token);
          setTokenExpiry(Date.now() + minutesInMilliseconds);
        } catch (err) {
          toast(TOAST_MESSAGES.TOKEN_ERROR);
          await logoutKaKaoToken();
          clearUser();
          router.replace("/main/home");
        }
      } else {
        try {
          const reissueResponse = await reissueTokens();
          setUser({ accessToken: reissueResponse.response.accessToken });
          setTokenExpiry(Date.now() + minutesInMilliseconds);
          reissueTimeout = setTimeout(reissue, minutesInMilliseconds);
        } catch (error) {
          toast(TOAST_MESSAGES.TOKEN_ERROR);
          await logout();
        }
      }
    };

    let reissueTimeout = setTimeout(reissue, minutesInMilliseconds);

    return () => {
      clearTimeout(reissueTimeout);
    };
  }, [logout, setTokenExpiry, setUser, toast]);

  // 일반 로그인
  useEffect(() => {
    if (kakaoRefreshToken) return;

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
          toast(TOAST_MESSAGES.TOKEN_ERROR);
          await logout();
          clearUser();

          setTimeout(() => {
            router.replace("/accounts/login");
          }, 3000);
        }
      } else if (pathname === "/") {
        router.replace("/main/home");
      }
    };

    validateTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.accessToken, user.tokenExpiry, router, pathname, isTokenExpired, setUser, setTokenExpiry]);

  // 카카오 리프레쉬 토큰 로직
  useEffect(() => {
    if (kakaoRefreshToken && isTokenExpired) {
      const getKakaoRefresh = async () => {
        try {
          const { data } = await getKaKaoRefreshToken(kakaoRefreshToken);

          setUser({ accessToken: data.access_token });
          localStorage.setItem("kakaoRefresh", data.refresh_token);
          setTokenExpiry(Date.now() + minutesInMilliseconds);
        } catch (err) {
          toast(TOAST_MESSAGES.TOKEN_ERROR);
          clearUser();
          removeItem("kakaoRefresh");

          setTimeout(() => {
            router.replace("/accounts/login");
          }, 3000);
        }
      };
      getKakaoRefresh();
    }
  }, [router, pathname, setUser]);

  return null;
};

export default AuthCheck;
