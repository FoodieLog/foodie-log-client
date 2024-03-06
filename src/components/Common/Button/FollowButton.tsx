import { getFeedList, getFeedListByUserId, getSingleFeed, followUser, unfollowUser } from "@services/apiFeed";
import { UserPlus } from "@assets/icons";

interface FollowButtonProps {
  isFollowed: boolean;
  userId: number;
  size: string;
}

function FollowButton({ isFollowed, userId, size }: FollowButtonProps) {
  const clickFollowBtnHandler = async () => {
    try {
      if (!isFollowed) {
        const response = await followUser(userId);
        console.log("팔로우 버튼", response);
      } else {
        const response = await unfollowUser(userId);
        console.log("언팔 버튼", response);
      }
    } catch (error) {
      console.log("팔로우 버튼 에러", error);
    }
  };
  // 임시 팔로우 상태를 반영하는 state를 하나 만들던지, 다른 방식을 찾던지
  //   const updateFollowStatus = async (userId: number, newStatus: boolean) => {
  //   let response;
  //   try {
  //     if (newStatus) {
  //       response = await followUser(userId);
  //     } else {
  //       response = await unfollowUser(userId);
  //     }

  //     if ((newStatus && response.status === 201) || (!newStatus && response.status === 204)) {
  //       setFeedsData((prevData) => {
  //         return prevData.map((content) => {
  //           if (content.feed.userId === userId) {
  //             return { ...content, followed: newStatus };
  //           }
  //           return content;
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to update follow state:", error);
  //   }
  // };

  return (
    <button
      type="button"
      onClick={clickFollowBtnHandler}
      className={isFollowed ? `followingBtn ${size}` : `followBtn ${size}`}
    >
      {isFollowed ? (
        <p>팔로잉</p>
      ) : (
        <p className="flex gap-1 justify-center items-center">
          <UserPlus /> 팔로우
        </p>
      )}
    </button>
  );
}

export default FollowButton;
