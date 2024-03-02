"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@store/useUserStore";
import { useRouter, usePathname } from "next/navigation";
import { reissueTokens } from "@services/apiFeed";
import { tokenLoader } from "@utils/token";
import { useToast } from "@/components/ui/use-toast";
import { getKaKaoRefreshToken } from "@services/kakao";
import useLogout from "@hooks/useLogout";
import { expiryTime } from "@utils/date";

const AuthCheck: React.FC = () => {
  const { toast } = useToast();
  const { user, setUser, setTokenExpiry } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setTokenExpiry: state.setTokenExpiry,
  }));
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();

  // const kakaoRefreshToken = tokenLoader();

  // 일반 로그인
  useEffect(() => {
    const validateTokens = async () => {
      if (!user.accessToken) {
        await logout();
        return;
      }

      const isTokenExpired = user.tokenExpiry ? Date.now() > user.tokenExpiry : true;

      if (isTokenExpired) {
        try {
          const reissueResponse = await reissueTokens();

          if (reissueResponse.status === 201 && reissueResponse.response && reissueResponse.response.accessToken) {
            // 새로 발급받은 accessToken 설정
            setUser({ accessToken: reissueResponse.response.accessToken });

            setTokenExpiry(expiryTime);
          } else {
            console.error(reissueResponse.error.message.accessToken);
            toast({ description: "토큰이 유효하지 않습니다.\n다시 로그인해 주세요!" });
            await logout();
          }
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
  }, [user.accessToken, user.tokenExpiry, router, pathname]);

  //카카오 리프레쉬 토큰 로직

  // useEffect(() => {
  //   const token = localStorage.getItem("kakaoRefresh");

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

  // }, []);

  return null;
};

export default AuthCheck;
