"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/src/store/useUserStore";
import { useRouter } from "next/navigation";

const AuthCheck: React.FC = () => {
  const { accessToken, tokenExpiry } = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const isTokenExpired = tokenExpiry ? Date.now() > tokenExpiry : true;

    if (accessToken === null || accessToken === "" || isTokenExpired) {
      router.replace("/accounts/login");
    }
  }, [accessToken, tokenExpiry, router]);

  return null;
};

export default AuthCheck;
