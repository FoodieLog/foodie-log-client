"use client";
import React from "react";
import MyProfile from "../../../components/Mypage/MyProfile";
import { useUserStore } from "@/src/store/useUserStore";
function MyPage() {
  const userId = useUserStore((state) => state.user.id);
  console.log(userId);
  if (!userId) return;

  return <MyProfile userId={userId} option="설정 및 개인정보" />;
}

export default MyPage;
