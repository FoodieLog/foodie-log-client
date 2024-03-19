"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFeedShared } from "@services/apiFeed";
import FeedImageSlide from "@components/Feed/FeedImageSlide";
import dayjs from "dayjs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { getTimeDiff } from "@utils/date";
import ShopCard from "@components/Common/Card/ShopCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FeedSharedProps, FeedShared } from "@@types/feed";
import { useToast } from "@/components/ui/use-toast";

const FeedShared: React.FC<FeedSharedProps> = ({ Id }) => {
  const [feedData, setFeedData] = useState<FeedShared | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const feedId = Number(Id);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getFeedShared(feedId);
        if (response.status === 200) {
          setFeedData(response.response);
        }
      } catch (error) {
        toast({ title: "오류 발생", description: "처리 중에 오류가 발생하였습니다." });
      }
    }

    fetchData();
  }, [feedId]);

  // 만약 feedData가 아직 로드되지 않았다면 null 또는 로딩 컴포넌트를 반환
  if (!feedData) return null;

  const timeDifference = getTimeDiff(dayjs(feedData.createdAt));

  const iconClickHandler = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-[640px] mx-auto mt-6 sm:border sm:rounded">
      <div className="flex items-center p-3">
        <div className="relative w-12 h-12" onClick={iconClickHandler}>
          {feedData.profileImageUrl ? (
            <Image
              fill={true}
              src={feedData.profileImageUrl}
              alt="사용자 썸네일"
              sizes="(max-width: 48px) 48px, 48px"
              className="w-12 h-12 border p-1 rounded-full cursor-pointer "
            />
          ) : (
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
          <p className="font-bold cursor-pointer" onClick={iconClickHandler}>
            {feedData.nickName}
          </p>
          <p className="text-sm">{timeDifference}</p>
        </div>

        <button
          className="w-30 h-9 py-2 mr-4 px-4 text-white font-bold rounded-2xl bg-green-400 hover:bg-green-500 border-0"
          onClick={iconClickHandler}
        >
          팔로우
        </button>
        <BsThreeDotsVertical className="cursor-pointer ml-2" onClick={iconClickHandler} />
      </div>
      <FeedImageSlide images={feedData.feedImages} />
      {/* 여기서 restaurant 데이터에 따라서 ShopCard 컴포넌트를 수정해야 합니다. */}
      <button className="cursor-pointer" onClick={iconClickHandler}>
        <ShopCard
          id={feedData.restaurant.id}
          name={feedData.restaurant.name}
          category={feedData.restaurant.category}
          roadAddress={feedData.restaurant.roadAddress}
          disableClick={true}
        />
      </button>
      <p className="p-3">{feedData.content}</p>
      <div className="flex flex-between gap-2 items-center text-lg p-3">
        <button className="text-2xl" onClick={iconClickHandler}>
          {/* like 상태에 따라 아이콘을 변경해야 함 */}
          <AiOutlineHeart />
        </button>
        <p>{feedData.likeCount}</p>
        {/* reply 기능에 따라 아래 코드 수정 */}
        <FaRegCommentDots className="text-2xl cursor-pointer" onClick={iconClickHandler} />
        <p className="flex-1">{feedData.replyCount}</p>
        <FiShare2 className="text-[24px] cursor-pointer" onClick={iconClickHandler} />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>더욱 더 다양한 정보가 필요하시면</DialogTitle>
            <DialogDescription>로그인 또는 회원 가입을 해주세요.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => router.push("/accounts/login")}>로그인</Button>
            <Button variant="outline" onClick={() => router.push("/accounts/signup")}>
              회원가입
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedShared;
