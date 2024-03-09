import { UserPlus } from "@assets/icons";
import useFollowMutations from "@hooks/mutations/useFollowMutaton";

interface FollowButtonProps {
  isFollowed: boolean;
  userId: number;
  className: string;
  icon?: boolean;
}

function FollowButton({ isFollowed, userId, className, icon = false }: FollowButtonProps) {
  const { followMutation, unfollowMutation } = useFollowMutations(userId);

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
