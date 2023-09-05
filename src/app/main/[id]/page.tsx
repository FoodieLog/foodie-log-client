"use client";
import React from "react";
import MyProfile from "../../../components/Mypage/MyProfile";
import { usePathname } from "next/navigation";

function MyProfilePage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  return <MyProfile userId={userId} option="신고" />;
}

export default MyProfilePage;
