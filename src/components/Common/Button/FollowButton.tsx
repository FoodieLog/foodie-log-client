import UserPlus from "@assets/icons/common/UserPlus.svg";
import useFollowMutation from "@/src/hooks/mutations/useFollowMutation";
import { useParams } from "next/navigation";

interface FollowButtonProps {
  isFollowed: boolean | undefined;
  userId: number;
  className: string;
  icon?: boolean;
  object?: string;
}

function FollowButton({ isFollowed, userId, className, icon = false, object }: FollowButtonProps) {
  const params = useParams();
  const restaurantId = typeof params.restaurantId === "string" ? parseInt(params.restaurantId, 10) : undefined;
  const { followMutation, unfollowMutation } = useFollowMutation(userId, restaurantId, object);

  const clickFollowBtnHandler = async () => {
    if (isFollowed) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return (
    <button
      type="button"
      onClick={clickFollowBtnHandler}
      className={isFollowed ? `followingBtn ${className}` : `followBtn ${className}`}
    >
      {isFollowed ? (
        <p>팔로잉</p>
      ) : (
        <p className="flex gap-1 justify-center items-center">
          {icon && <UserPlus />}
          <p>팔로우</p>
        </p>
      )}
    </button>
  );
}

export default FollowButton;
