import Link from "next/link";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import UserThumbnail from "@components/Common/Thumbnail/UserThumbnail";
import PhotoThumbnail from "@components/Common/Thumbnail/PhotoThumbnail";
import FollowButton from "@components/Common/Button/FollowButton";
import { Notification } from "@@types/apiTypes";

function NotifItem({ ...notification }: Notification) {
  const { id, type, checkFlag, user, feed, reply, isFollowed, createdAt } = notification;

  const CONTENT_OPTION = {
    FOLLOW: {
      href: `/main/${user.id}`,
      content: "님이 당신을 팔로우 했습니다.",
    },
    LIKE: {
      href: `/main/feed/?feedId=${feed?.id}`,
      content: "님이 게시글을 좋아합니다.",
    },
    REPLY: {
      href: `/main/reply/${feed?.id}`,
      content: `님이 댓글을 남겼습니다:${reply?.content}`,
    },
  };

  return (
    <li className="w-full py-[12px] flex gap-2 items-center">
      <UserThumbnail profileImgUrl={user.profileImgUrl} userId={user.id} />
      <Link href={CONTENT_OPTION[type].href} className="w-full flex justify-between items-center">
        <div>
          <p className="text-gray-4">
            <strong>{user.nickName} </strong>
            {CONTENT_OPTION[type].content}
          </p>
          <TimeStamp createdAt={createdAt} styles="bg-transparent" />
        </div>
        {type === "FOLLOW" ? (
          <FollowButton isFollowed={isFollowed} userId={user.id} className="w-[64px]" />
        ) : (
          <PhotoThumbnail imgUrl={feed?.thumbnail} href={CONTENT_OPTION[type].href} />
        )}
      </Link>
    </li>
  );
}

export default NotifItem;
