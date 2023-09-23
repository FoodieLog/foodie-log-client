"use client";
import MyProfile from "@/src/components/Mypage/MyProfile";
import { useUserStore } from "@/src/store/useUserStore";

function MyPage() {
  const userId = useUserStore((state) => state.user.id);
  if (!userId) return;

  return <MyProfile userId={userId} option="설정 및 개인정보" />;
}

export default MyPage;
