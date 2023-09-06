import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FeedData } from "../../types/apiTypes";
import ImageSlide from "./ImageSlide";
import { getTimeDiff } from "../../utils/date";
import dayjs from "dayjs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { PiUserCircleBold } from "react-icons/pi";
import { getIcon } from "../../utils/iconUtils";
import Button from "../Button";
import ShopCard from "../Restaurant/ShopCard";
import { followUser, likeFeed, unfollowUser, unlikeFeed } from "@/src/services/apiFeed";

const Feed: React.FC<FeedData> = ({ feed, restaurant, isFollowed, isLiked }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timeDifference = getTimeDiff(dayjs(feed.createdAt));
  const router = useRouter();
  const [Follow, setFollow] = useState<boolean>(isFollowed);
  const [Like, setLike] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState<number>(feed.likeCount);

  const CLIENT_BASE_URL = "localhost:3000"

  // 주의 : 이미지 경로를 /public/images/... 로 시작하면 안된다.
  // 대부분의 프론트엔드 프레임워크나 빌드 도구에서는 public 디렉토리의 내용이 빌드 시 루트 경로(/)에 배포된다고 한다.
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(restaurant.category)}`;

  const handleLikeClick = async () => {
    try {
      if (Like) {
        const response = await unlikeFeed(feed.feedId);
        if (response.status === 200) {
          setLike(false);
          setLikeCount((prevCount) => prevCount - 1);
        }
      } else {
        const response = await likeFeed(feed.feedId);
        if (response.status === 201) {
          setLike(true);
          setLikeCount((prevCount) => prevCount + 1);
        }
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  const handleFollowButtonClick = async () => {
    try {
      if (Follow) {
        const response = await unfollowUser(feed.feedId);
        if (response.status === 200) {
          setFollow(false);
        }
      } else {
        const response = await followUser(feed.feedId);
        if (response.status === 201) {
          setFollow(true);
        }
      }
    } catch (error) {
      console.error("Failed to update follow state:", error);
    }
  };

  const handleReplyIconClick = () => {
    router.push(`/main/reply/${feed.feedId}`);
  };

  const handleShareClick = () => {
    const fullPath = `${CLIENT_BASE_URL}/entrance/${feed.feedId}`;
    console.log("fullPath", fullPath);
    navigator.clipboard.writeText(fullPath).then(
      () => {
        alert("클립보드에 링크가 저장되었습니다.\n\n피드를 공유해보세요!");
      },
      (error) => {
        console.error("Failed to copy text: ", error);
      }
    );
  };

  return (
    <div className="mt-2 w-full max-w-[640px] rounded-sm">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="relative w-12 h-12">
          {feed.profileImageUrl ? (
            <Image
              fill={true}
              src={feed.profileImageUrl}
              alt="사용자 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border p-1 rounded-full cursor-pointer"
            />
          ) : (
            // 기본 이미지 또는 대체 컴포넌트를 표시
            <Image
              fill={true}
              src="/images/userImage.png"
              alt="사용자 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border p-1 rounded-full cursor-pointer"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col ml-3">
          <p className="font-bold  cursor-pointer">{feed.nickName}</p>
          <p className="text-sm">{timeDifference}</p>
        </div>
        {/* isFollowed 가 true 면 버튼 label이 "팔로잉", 아니면 "팔로우" */}
        <button
          className="w-30 h-9 py-2 mr-4 px-4 text-white font-bold rounded-2xl 
        bg-green-400 hover:bg-green-500 border-0"
          onClick={handleFollowButtonClick}
        >
          {Follow ? "팔로잉" : "팔로우"}
        </button>
        {/* <Button variant={"primary"} size={"w-30 h-9"} onClick={handleButtonClick}>
          {Follow ? "팔로잉" : "팔로우"}
        </Button> */}
        <BsThreeDotsVertical className="cursor-pointer ml-2" />
      </div>
      {/* image */}
      <ImageSlide images={feed.feedImages} />
      {/* restaurant */}
      <ShopCard
        id={restaurant.id}
        name={restaurant.name}
        category={restaurant.category}
        roadAddress={restaurant.roadAddress}
      />
      {/* content */}
      <p className="p-3">{feed.content}</p>
      <div className="flex flex-between gap-2 items-center text-[18px] p-3">
        <button className="text-[24px]" onClick={handleLikeClick}>
          {Like ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <p>{likeCount}</p>
        <FaRegCommentDots className="text-[24px] cursor-pointer" onClick={handleReplyIconClick} />
        <p className="flex-1">{feed.replyCount}</p>
        <FiShare2 className="text-[24px] cursor-pointer" onClick={handleShareClick} />
      </div>
    </div>
  );
};

export default Feed;
