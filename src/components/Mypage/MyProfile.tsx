"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroller";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgFlagAlt } from "react-icons/cg";
import { getThumbnailByUserId, getFollowList, getFollowerList } from "@/src/services/mypage";
import { getMyProfile } from "@/src/services/mypage";
import { ThumbnailState, myProfileState } from "@/src/types/mypage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { followUser, unfollowUser } from "@/src/services/apiFeed";
import Button from "@/src/components/Common/Button";
import Header from "@/src/components/Common/Header";
import CustomModal from "@/src/components/Common/Dialog/CustomModal";
import MyFriendList from "@/src/components/Mypage/MyFriendList";
import { MyPageForm } from "@/src/types/mypage";

function MyPageForm({ userId, option }: MyPageForm) {
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [friendListTitle, setFriendListTitle] = useState("");
  const [thumbnails, setThumbnails] = useState<ThumbnailState[]>([]);
  const [myProfile, setMyProfile] = useState<myProfileState>({
    aboutMe: "",
    nickName: "",
    feedCount: 0,
    follower: 0,
    following: 0,
    followed: false,
    profileImageUrl: "/images/userImage.png",
    userId: 0,
  });

  const router = useRouter();

  useEffect(() => {
    checkMyProfile();
    setIsClient(true);
    setIsLoading(false);
  }, [reload]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["thumbnailList", userId],
    async ({ pageParam = 0 }) => {
      if (userId) {
        const response = await getThumbnailByUserId(userId, pageParam);
        console.log("Thumbnail : ", response);
        return response.response;
      }
      throw new Error("User ID is not provided");
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.content?.length < 15) return undefined;
        return lastPage?.content[lastPage.content.length - 1]?.feed.feedId || 0;
      },
    }
  );

  const checkMyProfile = async () => {
    try {
      if (userId) {
        const response = await getMyProfile(userId);
        setMyProfile(response.data.response);
        console.log("마이프로필 성공", response.data.response);
      }
    } catch (error) {
      console.log("마이프로필 실패", error);
    }
  };

  const onClickFollow = useCallback(async () => {
    setShowModal(true);
    setFriendListTitle("팔로우");
    try {
      const { response } = await getFollowList(userId);
      setFriendList(response.content);
    } catch (error) {}
  }, [userId]);

  const onClickFollower = useCallback(async () => {
    setShowModal(true);
    setFriendListTitle("팔로워");
    try {
      const { response } = await getFollowerList(userId);
      setFriendList(response.content);
    } catch (error) {}
  }, [userId]);

  if (!myProfile) {
    return null;
  }

  if (!isClient) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const onClickProfileEdit = async () => {
    if (option === "타인") {
      try {
        let newFollowStatus: boolean | undefined;
        if (myProfile.followed) {
          const response = await unfollowUser(userId); // unfollow API 호출
          if (response.status === 204) {
            newFollowStatus = false;
          }
        } else {
          const response = await followUser(userId); // follow API 호출
          if (response.status === 201) {
            newFollowStatus = true;
          }
        }

        if (newFollowStatus !== undefined) {
          setMyProfile({
            ...myProfile,
            followed: newFollowStatus,
          }); // 팔로우 상태 업데이트
        }
      } catch (error) {
        console.error("팔로우 상태 업데이트 실패:", error);
      }
    } else {
      router.push("/main/mypage/edit"); // 기존 로직
    }
  };

  return (
    <section className="w-full sm:max-w-[640px] mx-auto">
      {showModal && (
        <CustomModal showModal={showModal} setShowModal={setShowModal} reload={reload}>
          <MyFriendList
            data={friendList}
            friendListTitle={friendListTitle}
            reload={reload}
            setReload={setReload}
            updateFollow={onClickFollow}
            updateFollower={onClickFollower}
          />
        </CustomModal>
      )}
      <Header title={myProfile.nickName} type="left" back="prePage" option={option} />
      <main className="px-4 space-y-3">
        <header className="flex items-center mt-5 mb-3 mx-3 justify-between shrink-0">
          <div className="relative ml-3 w-[70px] h-[70px] shrink-0 rounded-full overflow-hidden cursor-pointer">
            <div className="absolute w-full h-full">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={myProfile?.profileImageUrl || "/images/userImage.png"}
                alt="프로필 사진"
                className="object-cover"
              />
            </div>
          </div>
          <ul className="w-full flex justify-evenly">
            <li className="flex flex-col items-center justify-center">
              <p className="text-lg">{myProfile?.feedCount}</p>
              <p className="text-sm">게시물</p>
            </li>
            <li className="flex flex-col items-center justify-center cursor-pointer">
              <button type="button" onClick={onClickFollower}>
                <p className="text-lg">{myProfile?.follower}</p>
                <p className="text-sm">팔로워</p>
              </button>
            </li>
            <li className="flex flex-col items-center justify-center cursor-pointer">
              <button type="button" onClick={onClickFollow}>
                <p className="text-lg">{myProfile?.following}</p>
                <p className="text-sm">팔로우</p>
              </button>
            </li>
          </ul>
        </header>
        <div className="px-6">
          <p>{myProfile?.aboutMe}</p>
        </div>
        <div>
          <Button type="button" variant={"primary"} onClick={onClickProfileEdit}>
            {option === "타인" ? (myProfile.followed === true ? "언팔로우" : "팔로우") : "프로필 수정"}
          </Button>
        </div>
        <div className="flex justify-around w-full py-2 border">
          <Link href={`/main/feed/${userId}`}>
            <BiPhotoAlbum size="1.2rem" />
          </Link>
          <Link href={option === "타인" ? `/main/map/${userId}` : "/main/mypage/map"}>
            <CgFlagAlt size="1.2rem" />
          </Link>
        </div>
        <article className="">
          <InfiniteScroll pageStart={0} loadMore={() => fetchNextPage()} hasMore={hasNextPage && !isFetchingNextPage}>
            <ul className="w-full grid grid-cols-3 gap-2">
              {data?.pages.map((page, index) => (
                // page에 대한 key 추가
                <React.Fragment key={index}>
                  {page?.content?.map((thumbnail: any) => (
                    <li key={thumbnail.feed.feedId} className="">
                      <Link
                        href={`/main/feed/${userId}?feedId=${thumbnail.feed.feedId}`}
                        className="w-full h-full relative after:content-[''] after:block after:pb-[100%]  overflow-hidden"
                        style={{ paddingBottom: "100%" }}
                      >
                        <Image
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={thumbnail.feed.thumbnailUrl}
                          alt={`썸네일${thumbnail.feed.feedId}`}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </InfiniteScroll>
        </article>
      </main>
    </section>
  );
}

export default MyPageForm;
