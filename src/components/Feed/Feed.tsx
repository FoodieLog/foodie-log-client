"use client";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FeedData } from "@/src/types/apiTypes";
import { getTimeDiff } from "@/src/utils/date";
import { likeFeed, unlikeFeed } from "@/src/services/apiFeed";
import { useUserStore } from "@/src/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import ShopCard from "@/src/components/Restaurant/ShopCard";
import DropDown from "@/src/components/Common/DropDown/DropDown";
import FeedImageSlide from "@/src/components/Feed/FeedImageSlide";
import useSignUpStore from "@/src/store/useSignUpStore";
import { FeedProps } from "@/src/types/feed";

const Feed: React.FC<FeedProps> = ({
  feed,
  restaurant,
  isFollowed,
  isLiked,
  updateFollowStatus,
  removeDeletedFeed,
}) => {
  const [likeCount, setLikeCount] = useState<number>(feed.likeCount);
  const [expandedFeed, setExpandedFeed] = useState(false);
  const [Like, setLike] = useState<boolean>(isLiked);
  const timeDifference = getTimeDiff(dayjs(feed.createdAt));
  const userId = useUserStore((state) => state.user.id);
  const nextComponent = useSignUpStore((state) => state.nextComponent);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { toast } = useToast();

  const router = useRouter();
  const CLIENT_BASE_URL = "https://foodielog.shop";

  const handleLikeClick = async () => {
    try {
      if (Like) {
        const response = await unlikeFeed(feed.feedId);
        if (response.status === 204) {
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

  // 팔로우 버튼의 기본 클래스 설정
  const followButtonClass = `text-gray-900 border border-gray-300 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mr-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700 bg-white`;

  // 팔로우 상태에 따른 호버 버튼의 클래스 설정
  const buttonClass = isFollowed
    ? `${followButtonClass} hover:bg-slate-200 opacity-0`
    : `${followButtonClass} hover:bg-gray-100`;

  const handleFollowButtonClick = async () => {
    if (updateFollowStatus) {
      updateFollowStatus(feed.userId, !isFollowed);
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
        toast({ title: "클립보드에 링크 저장💌!", description: "'붙여넣기'로 피드를 공유해보세요👍!" });
        // alert("클립보드에 링크가 저장되었습니다.\n\n피드를 공유해보세요!");
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
        <Link href={`/main/${feed.userId}`} className="relative w-12 h-12">
          <Image
            fill={true}
            src={feed.profileImageUrl || "/images/userImage.png"}
            alt="사용자 썸네일"
            sizes="(max-width: 48px) 48px, 48px"
            className="w-12 h-12 border p-1 rounded-full cursor-pointer"
          />
        </Link>
        <div className="flex flex-1 flex-col ml-3">
          <Link href={`/main/${feed.userId}`}>
            <p className="font-bold  cursor-pointer">{feed.nickName}</p>
          </Link>
          <p className="text-sm">{timeDifference}</p>
        </div>
        {/* isFollowed 가 true 면 버튼 label이 "팔로잉", 아니면 "팔로우" */}
        {userId !== feed.userId ? (
          <button className={buttonClass} onClick={handleFollowButtonClick} disabled={isFollowed}>
            {isFollowed ? "팔로잉" : "팔로우"}
          </button>
        ) : null}
        <div>
          <DropDown
            name={feed.nickName}
            option={feed.userId === userId ? "본인" : "타인"}
            id={feed.feedId}
            type={"게시글"}
            content={feed.content}
            removeDeletedFeed={removeDeletedFeed}
          />
        </div>
      </div>
      {/* image */}
      <FeedImageSlide images={feed.feedImages} />
      {/* restaurant */}
      <ShopCard
        id={restaurant.id}
        name={restaurant.name}
        category={restaurant.category}
        roadAddress={restaurant.roadAddress}
      />
      {/* content */}
      <div className="mx-2 whitespace-pre-wrap">
        {feed.content.length > 90 && !expandedFeed ? (
          <>
            {feed.content.substring(0, 90) + "... "}
            <button className="text-blue-500" onClick={() => setExpandedFeed(true)}>
              더보기
            </button>
          </>
        ) : (
          <>
            <p className="">{feed.content}</p>
            {expandedFeed && (
              <button className="text-blue-500" onClick={() => setExpandedFeed(false)}>
                접기
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex flex-between gap-2 items-center text-[18px] p-3">
        <button className="text-[24px]" onClick={handleLikeClick}>
          {Like ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <p>{likeCount}</p>
        <FaRegCommentDots className="text-[24px] cursor-pointer ml-5" onClick={handleReplyIconClick} />
        <p className="flex-1">{feed.replyCount}</p>
        <FiShare2 className="text-[24px] cursor-pointer" onClick={handleShareClick} />
      </div>
    </div>
  );
};

export default Feed;
