import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { unlikeFeed, likeFeed } from "@services/feed";
import { ShareFat, HeartStraight, FullHeartStraight, ChatCircleText } from "@assets/icons";
import { FeedData } from "@@types/apiTypes";
import { TOAST_MESSAGES } from "@constants";

interface FeedInteractionProps {
  data: FeedData["feed"];
  isLiked: boolean;
}

function FeedInteraction({ data, isLiked }: FeedInteractionProps) {
  const [likeCount, setLikeCount] = useState<number>(data.likeCount);
  const [like, setLike] = useState<boolean>(isLiked);
  const { toast } = useToast();
  const router = useRouter();

  const clickLikeBtnHandler = async () => {
    try {
      if (like) {
        await unlikeFeed(data.feedId);
        setLike(false);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await likeFeed(data.feedId);
        setLike(true);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const ERROR_MESSAGE = error.response.data.error.message;
        toast({ description: ERROR_MESSAGE || TOAST_MESSAGES.PROFILE_EDIT_FAILURE });
      }
    }
  };
  const clickReplyBtnHandler = () => {
    router.push(`/main/reply/${data.feedId}`);
  };

  const clickShareBtnHandler = () => {
    const fullPath = `https://foodielog.shop/entrance/${data.feedId}`;

    try {
      navigator.clipboard.writeText(fullPath);
      toast({ title: "클립보드에 링크 저장💌!", description: "'붙여넣기'로 피드를 공유해보세요👍!" });
    } catch (error) {
      toast({ title: "공유 링크 복사 오류", description: "공유 링크를 복사할 수 없습니다." });
    }
  };
  return (
    <div className="w-full flex gap-2.5 flex-between items-center text-base">
      <button className="flex gap-1 items-center" onClick={clickLikeBtnHandler}>
        {/* Todo: 하트 아이콘 수정 */}
        {like ? <FullHeartStraight /> : <HeartStraight />}
        <p>{likeCount}</p>
      </button>
      <button className="flex gap-1 items-center" onClick={clickReplyBtnHandler}>
        <ChatCircleText />
        <p className="flex-1">{data.replyCount}</p>
      </button>
      <button onClick={clickShareBtnHandler}>
        <ShareFat />
      </button>
    </div>
  );
}

export default FeedInteraction;
