import Link from "next/link";
import TimeStamp from "@components/Common/Tag/TimeStamp";
import UserThumbnail from "@components/Common/Thumbnail/UserThumbnail";
import FeedThumbnail from "@components/Common/Thumbnail/FeedThumbnail";
import FollowButton from "@components/Common/Button/FollowButton";
import { Notification } from "@@types/apiTypes";

function NotifItem({ ...notification }: Notification) {
  const { type, user, feed, reply, isFollowed, createdAt } = notification;

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
      <UserThumbnail profileImgUrl={user.profileImgUrl} userId={user.id} size="w-12 h-12" />
      <Link href={CONTENT_OPTION[type].href} className="w-full">
        <p className="text-gray-4">
          <strong>{user.nickName} </strong>
          {CONTENT_OPTION[type].content}
        </p>
        <TimeStamp createdAt={createdAt} styles="bg-transparent" />
      </Link>
      {type === "FOLLOW" ? (
        <FollowButton isFollowed={isFollowed} userId={user.id} className="w-[64px]" />
      ) : (
        <FeedThumbnail imgUrl={feed?.thumbnail} href={CONTENT_OPTION[type].href} />
      )}
    </li>
  );
}

export default NotifItem;
