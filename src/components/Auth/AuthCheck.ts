"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter, usePathname } from "next/navigation";

const AuthCheck: React.FC = () => {
  const { accessToken, tokenExpiry } = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname", pathname);

  useEffect(() => {
    const isTokenExpired = tokenExpiry ? Date.now() > tokenExpiry : true;

    if (accessToken === null || accessToken === "" || isTokenExpired) {
      router.replace("/accounts/login");
    } else if (pathname === "/") {
      router.replace("/main/home");
    } else {
      return;
    }
  }, [accessToken, tokenExpiry, router,pathname]);

  return null;
};

export default AuthCheck;
