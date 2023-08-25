import Image from "next/image";
import { useState } from "react";
import { FeedData } from "../types/apiTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import ImageSlide from "./ImageSlide";
import { getTimeDiff } from "../utils/date";
import dayjs from "dayjs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { getIcon } from "../utils/iconUtils";
import Button from "./Button";
import ShopCard from "./ShopCard";

const Feed: React.FC<FeedData> = ({ feed, restaurant, isFollowed, isLiked }) => {
  const timeDifference = getTimeDiff(dayjs(feed.createdAt));

  const [Follow, setFollow] = useState<boolean>(isFollowed);
  const [Like, setLike] = useState<boolean>(isLiked);

  // 주의 : 이미지 경로를 /public/images/... 로 시작하면 안된다.
  // 대부분의 프론트엔드 프레임워크나 빌드 도구에서는 public 디렉토리의 내용이 빌드 시 루트 경로(/)에 배포된다고 한다.
  const shopCategoryIcon = `/images/foodCategoryIcons/${getIcon(restaurant.category)}`;

  const handleButtonClick = () => {
    setFollow(!Follow);
  };

  return (
    <div className="mt-2 w-full max-w-[640px] bg-mint-light border rounded-sm px-2">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="relative w-12 h-12">
          <Image
            fill={true}
            src={feed.profileImageUrl}
            alt="사용자 썸네일"
            sizes="(max-width: 48px) 48px, 48px"
            className="w-12 h-12 border p-1 rounded-full cursor-pointer"
          />
        </div>
        <div className="flex flex-1 flex-col ml-3">
          <p className="font-bold  cursor-pointer">{feed.nickName}</p>
          <p className="text-sm">{timeDifference}</p>
        </div>
        {/* isFollowed 가 true 면 버튼 label이 "팔로잉", 아니면 "팔로우" */}
        <button
          className="w-30 h-9 py-2 mr-4 px-4 text-white font-bold rounded-2xl 
        bg-green-400 hover:bg-green-500 border-0"
          onClick={handleButtonClick}
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
      <p className="p-1">{feed.content}</p>
      <div className="flex flex-between gap-2 items-center text-[18px] p-3">
        <button className="text-[24px]" onClick={() => setLike(!Like)}>
          {Like ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <p>{feed.likeCount}</p>
        <FaRegCommentDots className="text-[24px] cursor-pointer" />
        <p className="flex-1">{feed.replyCount}</p>
        <FiShare2 className="text-[24px] cursor-pointer" />
      </div>
    </div>
  );
};

export default Feed;
