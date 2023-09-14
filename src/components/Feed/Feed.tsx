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
import { getIcon } from "../../utils/iconUtils";
import Button from "../Common/Button";
import ShopCard from "../Restaurant/ShopCard";
import { followUser, likeFeed, unfollowUser, unlikeFeed } from "@/src/services/apiFeed";
import DropDown from "../Common/Menu/DropDown";
import { useUserStore } from "@/src/store/useUserStore";
import FeedModal from "./FeedModal";
import useSignUpStore from "@/src/store/useSignUpStore";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type FeedProps = FeedData & {
  updateFollowStatus?: (userId: number, newStatus: boolean) => void;
  removeDeletedFeed?: (feedId: number) => void;
};

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
  // const [Follow, setFollow] = useState<boolean>(isFollowed);
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
    ? `${followButtonClass} hover:bg-slate-200 opacity-0 cursor-not-allowed`
    : `${followButtonClass} hover:bg-gray-100`;

  const handleFollowButtonClick = async () => {
    try {
      let newFollowStatus;
      if (isFollowed) {
        const response = await unfollowUser(feed.userId);
        if (response.status === 204) {
          newFollowStatus = false;
          // setFollow(newFollowStatus);
        }
      } else {
        const response = await followUser(feed.userId);
        if (response.status === 201) {
          newFollowStatus = true;
          // setFollow(newFollowStatus);
        }
      }
      // Feeds 컴포넌트의 팔로우 상태 업데이트 함수를 호출
      if (updateFollowStatus && newFollowStatus !== undefined) {
        updateFollowStatus(feed.userId, newFollowStatus);
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
            removeDeletedFeed={removeDeletedFeed}
          />
          {nextComponent === "EditModal" ? <FeedModal feedId={feed.feedId} preContent={feed.content} /> : null}
        </div>
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
      <div className="mx-2">
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
