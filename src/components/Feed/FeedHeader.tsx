import { FeedData } from "@@types/apiTypes";
import { useUserStore } from "@store/useUserStore";
import FollowButton from "@components/Common/Button/FollowButton";
import DropDown from "@components/Common/DropDown/DropDown";
import FeedUserCard from "@components/Feed/FeedUserCard";

interface FeedHeaderProps {
  data: FeedData["feed"];
  isFollowed: boolean;
}

function FeedHeader({ data, isFollowed }: FeedHeaderProps) {
  const userId = useUserStore((state) => state.user.id);

  return (
    <div className="flex justify-between items-center p-3">
      <FeedUserCard data={data} />
      <div className="flex items-center">
        {userId !== data.userId && <FollowButton userId={data.userId} isFollowed={isFollowed} size={"w-[86px]"} />}
        <DropDown
          name={data.nickName}
          option={data.userId === userId ? "본인" : "타인"}
          id={data.feedId}
          type={"게시글"}
          content={data.content}
        />
      </div>
    </div>
  );
}

export default FeedHeader;