"use client";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { getTimeDiff } from "@/src/utils/date";
import { likeFeed, unlikeFeed } from "@/src/services/feed";
import { useUserStore } from "@/src/store/useUserStore";
import { useToast } from "@/components/ui/use-toast";
import ShopCard from "@/src/components/Restaurant/ShopCard";
import DropDown from "@/src/components/Common/DropDown/DropDown";
import FeedImageSlide from "@/src/components/Feed/FeedImageSlide";
import { FeedProps } from "@/src/types/feed";
import { followButtonClass } from "@/src/styles/feedStyle";

// React.FC 지양하기
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
  const [like, setLike] = useState<boolean>(isLiked);

  const timeDifference = getTimeDiff(dayjs(feed.createdAt));
  const userId = useUserStore((state) => state.user.id);

  const { toast } = useToast();
  const router = useRouter();

  const clickLikeBtnHandler = async () => {
    try {
      if (like) {
        await unlikeFeed(feed.feedId);
        setLike(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await likeFeed(feed.feedId);
        setLike(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      toast({ title: "좋아요 오류 발생", description: "처리 중에 오류가 발생하였습니다." });
    }
  };

  const clickFollowBtnHandler = async () => {
    if (updateFollowStatus) {
      updateFollowStatus(feed.userId, !isFollowed);
    }
  };

  const clickReplyBtnHandler = () => {
    router.push(`/main/reply/${feed.feedId}`);
  };

  const clickShareBtnHandler = () => {
    const fullPath = `https://foodielog.shop/entrance/${feed.feedId}`;

    try {
      navigator.clipboard.writeText(fullPath);
      toast({ title: "클립보드에 링크 저장💌!", description: "'붙여넣기'로 피드를 공유해보세요👍!" });
    } catch (error) {
      toast({ title: "공유 링크 복사 오류", description: "공유 링크를 복사할 수 없습니다." });
    }
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
        {userId !== feed.userId ? (
          <button className={followButtonClass} onClick={clickFollowBtnHandler} disabled={isFollowed}>
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
        <button className="text-[27px] font-bold text-red-600" onClick={clickLikeBtnHandler}>
          {like ? <AiFillHeart /> : <AiOutlineHeart className="text-[#65676b]" />}
        </button>
        <p>{likeCount}</p>
        <button onClick={clickReplyBtnHandler}>
          <FaRegCommentDots className="text-[24px] cursor-pointer ml-5 text-[#65676b]" />
        </button>
        <p className="flex-1">{feed.replyCount}</p>
        <button onClick={clickShareBtnHandler}>
          <FiShare2 className="text-[24px] cursor-pointer text-[#65676b]" />
        </button>
      </div>
    </div>
  );
};

export default Feed;
