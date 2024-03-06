import MyProfile from "@components/Mypage/MyProfile";

function MyProfilePage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);

  return <MyProfile userId={userId} option="타인" />;
}

export default MyProfilePage;
