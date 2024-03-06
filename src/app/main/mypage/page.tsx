"use client";
import MyProfile from "@components/Mypage/MyProfile";
import { useUserStore } from "@store/useUserStore";

function MyPage() {
  const userId = useUserStore((state) => state.user.id);
  if (!userId) return;

  return <MyProfile userId={userId} option="설정 및 개인정보" />;
}

export default MyPage;
