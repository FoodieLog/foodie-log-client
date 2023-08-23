import { useState } from "react";
import { FeedData } from "../types/apiTypes";
import { BsThreeDotsVertical } from "react-icons/bs";
import ImageSlide from "./ImageSlide";
import { getTimeDiff } from "../utils/date";
import dayjs from "dayjs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const Feed: React.FC<FeedData> = ({ feed, restaurant, isFollowed, isLiked }) => {
  const timeDifference = getTimeDiff(dayjs(feed.createdAt));

  const [Follow, setFollow] = useState<boolean>(isFollowed);
  const [Like, setLike] = useState<boolean>(isLiked);

  return (
    <div className="mt-2 w-full max-w-[640px] bg-mint-light border rounded-sm px-2">
      {/* Header */}
      <div className="flex items-center p-3">
        <img
          src={feed.profileImageUrl}
          alt="userProfile"
          className="w-12 h-12 border p-1 mr-3 rounded-full cursor-pointer"
        />
        <div className="flex flex-1 flex-col">
          <p className="font-bold  cursor-pointer">{feed.nickName}</p>
          <p className="text-sm">{timeDifference}</p>
        </div>
        {/* isFollowed 가 true 면 버튼 label이 "팔로잉", 아니면 "팔로우" */}
        <button className="w-30 h-9 py-2 mr-4 px-4 text-white font-bold rounded-2xl bg-green-400 hover:bg-green-500 border-0">
          {Follow ? "팔로잉" : "팔로우"}
        </button>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      {/* image */}
      <ImageSlide images={feed.feedImages} />
      {/* restaurant */}
      <div className="flex flex-col items-start p-3">
        <p className="font-bold cursor-pointer">{restaurant.name}</p>
        <p className="text-sm cursor-pointer">{restaurant.roadAddress}</p>
      </div>
      {/* content */}
      <p className="p-1">{feed.content}</p>
      <div className="flex flex-between gap-2 items-center text-[18px] p-3">
        <button className="text-[24px]" onClick={() => setLike(!Like)}>{Like ? <AiFillHeart /> : <AiOutlineHeart />}</button>
        <p>{feed.likeCount}</p>
        <FaRegCommentDots className="text-[24px] cursor-pointer"/>
        <p className="flex-1">{feed.replyCount}</p>
        <FiShare2  className="text-[24px] cursor-pointer"/>
      </div>
    </div>
  );
};

export default Feed;
