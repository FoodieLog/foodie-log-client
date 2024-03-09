"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mypage } from "@@types/mypage";
import Button from "@components/Common/Button";
import Header from "@components/Common/Header";
import MyFriendList from "@components/Mypage/MyFriendList";
import MyProfileTabContent from "@/src/components/Mypage/MyProfileTabContent";
import useMyPageQuery from "@/src/hooks/queries/useMyPageQuery";
import useMyFollowersQuery from "@hooks/queries/useMyFollowersQuery";
import useFollowMutations from "@hooks/mutations/useFollowMutaton";

function Mypage({ userId, option }: Mypage) {
  const [showFriendList, setShowFriendList] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [object, setObject] = useState("");

  const router = useRouter();

  const { data } = useMyPageQuery(userId);

  const { data: myFollowerData, refetch } = useMyFollowersQuery(userId, object);
  const { followMutation, unfollowMutation } = useFollowMutations(userId);

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
    <section className="w-full sm:max-w-[640px] mx-auto">
      {showFriendList && <MyFriendList data={myFollowerData} object={object} setShowFriendList={setShowFriendList} />}
      <Header title="마이" back="prePage" option={option} />
      <main className="px-4 space-y-3">
        <div className="flex justify-between items-center mt-5 mb-3 gap-[24px] shrink-0">
          <div className="relative w-[90px] h-[90px] shrink-0 rounded-full overflow-hidden">
            <div className="absolute w-full h-full">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={data?.profileImageUrl || "/images/userImage.png"}
                alt="프로필 사진"
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-[12px] text-gray-10">
            <p className="text-[18px] font-semibold">{data.nickName}</p>
            <div className="flex gap-2 text-[14px]">
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
        <div className="px-6 mb-[32px]">
          <p>{data?.aboutMe}</p>
        </div>
        {option === "타인" ? (
          <div className="mb-[32px]">
            <Button type="button" variant={data.followed ? "secondary" : "primary"} onClick={clickFollowBtn}>
              {data.followed ? "팔로잉" : "팔로우"}
            </Button>
          </div>
        ) : (
          <div className="mb-[32px]">
            <Button type="button" variant="secondary" onClick={clickProfileEdit}>
              프로필 수정
            </Button>
          </div>
        )}
        <MyProfileTabContent userId={userId} />
      </main>
    </section>
  );
}

export default Mypage;
