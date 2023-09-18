import React, { useId } from "react";
import MyProfile from "../../../components/Mypage/MyProfile";

function MyProfilePage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  console.log("유저 아이디 여깃슴", userId);
  return <MyProfile userId={userId} option="타인" />;
}

export default MyProfilePage;
