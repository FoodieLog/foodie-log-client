"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mypage } from "@@types/mypage";
import Button from "@components/Common/Button";
import Header from "@components/Common/Header";
import MyFriendList from "@components/Mypage/MyFriendList";
import MyProfileTabContent from "@components/Mypage/MyProfileTabContent";
import useMyPageQuery from "@hooks/queries/useMyPageQuery";
import useMyFollowersQuery from "@hooks/queries/useMyFollowersQuery";
import useFollowMutation from "@/src/hooks/mutations/useFollowMutation";
import UserThumbnail from "@components/Common/Thumbnail/UserThumbnail";
import { useUserStore } from "@store/useUserStore";

function Mypage({ userId, option }: Mypage) {
  const [showFriendList, setShowFriendList] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [object, setObject] = useState("");
  const { user } = useUserStore();

  const router = useRouter();

  const { data } = useMyPageQuery(userId);

  const { data: myFollowerData, refetch } = useMyFollowersQuery(userId, object);
  const { followMutation, unfollowMutation } = useFollowMutation(userId, undefined, object);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clickMyFollowersList = (title: string) => {
    setObject(title);
    refetch();
    setShowFriendList((prev) => !prev);
  };

  const clickFollowBtn = async () => {
    if (data.followed) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const clickProfileEdit = () => {
    router.push("/main/mypage/edit");
  };

  if (!data) {
    return null;
  }

  if (!isClient) {
    return null;
  }

  return (
    <section className="w-full sm:max-w-[640px] mx-auto h-[100vh] overflow-hidden relative">
      <MyFriendList data={myFollowerData} object={object} isOpener={showFriendList} setIsOpener={setShowFriendList} />
      <Header
        title={user.id === userId ? "마이" : ""}
        back="prePage"
        option={user.id === userId ? "설정 및 개인정보" : option}
      />
      <main className="px-4 py-5 space-y-3">
        <div className="flex justify-between items-center mb-3 gap-6 shrink-0">
          <UserThumbnail profileImgUrl={data?.profileImageUrl} userId={data?.userId} size="w-[90px] h-[90px]" />
          <div className="w-full flex flex-col gap-3 text-gray-10">
            <p className="text-[18px] font-semibold">{data.nickName}</p>
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-1">
                <p className="text-gray-4">게시물</p>
                <p className="text-gray-10 font-semibold">{data?.feedCount}</p>
              </div>
              <button type="button" onClick={() => clickMyFollowersList("팔로워")} className="flex items-center gap-1">
                <p className="text-gray-4">팔로워</p>
                <p className="text-gray-10 font-semibold">{data?.follower}</p>
              </button>
              <button type="button" onClick={() => clickMyFollowersList("팔로잉")} className="flex items-center gap-1">
                <p className="text-gray-4">팔로잉</p>
                <p className="text-gray-10 font-semibold">{data?.following}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-[32px]">
          <p>{data?.aboutMe}</p>
        </div>
        {user.id === userId ? (
          <div className="mb-[32px]">
            <Button type="button" variant="secondary" onClick={clickProfileEdit}>
              프로필 수정
            </Button>
          </div>
        ) : (
          <div className="mb-[32px]">
            <Button type="button" variant={data.followed ? "secondary" : "primary"} onClick={clickFollowBtn}>
              {data.followed ? "팔로잉" : "팔로우"}
            </Button>
          </div>
        )}
      </main>
      <MyProfileTabContent userId={userId} />
    </section>
  );
}

export default Mypage;
