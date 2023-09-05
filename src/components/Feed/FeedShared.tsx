"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFeedShared, FeedShared } from "@/src/services/apiFeed";
import ImageSlide from "./ImageSlide";
import dayjs from "dayjs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { PiUserCircleBold } from "react-icons/pi";
import { getTimeDiff } from "../../utils/date";
import ShopCard from "../Restaurant/ShopCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeedSharedProps {
  Id: string;
}

const FeedShared: React.FC<FeedSharedProps> = ({ Id }) => {
  const feedId = Number(Id);
  const [feedData, setFeedData] = useState<FeedShared | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getFeedShared(feedId);
        if (response.status === 200) {
          setFeedData(response.response);
        }
      } catch (error) {
        console.error("Failed to fetch feed data:", error);
      }
    }

    fetchData();
  }, [feedId]);

  // 만약 feedData가 아직 로드되지 않았다면 null 또는 로딩 컴포넌트를 반환
  if (!feedData) return null;

  const timeDifference = getTimeDiff(dayjs(feedData.createdAt));

  const handleIconClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-[640px] mx-auto mt-6 sm:border sm:rounded">
      <div className="flex items-center p-3">
        <div className="relative w-12 h-12" onClick={handleIconClick}>
          {feedData.profileImageUrl ? (
            <Image
              fill={true}
              src={feedData.profileImageUrl}
              alt="사용자 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border p-1 rounded-full cursor-pointer "
            />
          ) : (
            <div className="">
              <PiUserCircleBold className="w-12 h-12 text-zinc-500" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col ml-3">
          <p className="font-bold cursor-pointer" onClick={handleIconClick}>
            {feedData.nickName}
          </p>
          <p className="text-sm">{timeDifference}</p>
        </div>
        {/* Follow 버튼을 어떻게 처리할지에 따라 아래 코드를 수정 */}
        <button
          className="w-30 h-9 py-2 mr-4 px-4 text-white font-bold rounded-2xl bg-green-400 hover:bg-green-500 border-0"
          onClick={handleIconClick}
        >
          팔로우
        </button>
        <BsThreeDotsVertical className="cursor-pointer ml-2" onClick={handleIconClick} />
      </div>
      <ImageSlide images={feedData.feedImages} />
      {/* 여기서 restaurant 데이터에 따라서 ShopCard 컴포넌트를 수정해야 합니다. */}
      <ShopCard
        id={feedData.restaurant.id}
        name={feedData.restaurant.name}
        category={feedData.restaurant.category}
        roadAddress={feedData.restaurant.roadAddress}
      />
      <p className="p-3">{feedData.content}</p>
      <div className="flex flex-between gap-2 items-center text-[18px] p-3">
        <button className="text-[24px]" onClick={handleIconClick}>
          {/* like 상태에 따라 아이콘을 변경해야 함 */}
          <AiOutlineHeart />
        </button>
        <p>{feedData.likeCount}</p>
        {/* reply 기능에 따라 아래 코드 수정 */}
        <FaRegCommentDots className="text-[24px] cursor-pointer" onClick={handleIconClick} />
        <p className="flex-1">{feedData.replyCount}</p>
        <FiShare2 className="text-[24px] cursor-pointer" onClick={handleIconClick} />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>더욱 더 다양한 정보가 필요하시면</DialogTitle>
            <DialogDescription>로그인 또는 회원 가입을 해주세요.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => router.push("/accounts/login")}>
              로그인
            </Button>
            <Button variant="outline"onClick={() => router.push("/accounts/signup")}>
              회원가입
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedShared;
