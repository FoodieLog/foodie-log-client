"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getTimeDiff } from "@/src/utils/date";
import dayjs from "dayjs";
import { followUser, getNotificationList, unfollowUser } from "@/src/services/apiFeed";
import { Notification } from "../../types/apiTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NotificationList = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getNotificationList();
        console.log("response : ", response);
        setNotifications(response.response.content);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLikeClick = (feedId: any) => {
    router.push(`/main/feed/?feedId=${feedId}`);
  };

  const handleReplyClick = (feedId: any) => {
    router.push(`/main/reply/${feedId}`);
  };

  const updateFollowStatus = async (userId: number, newStatus: boolean) => {
    let response;
    try {
      if (newStatus) {
        response = await followUser(userId);
      } else {
        response = await unfollowUser(userId);
      }

      if ((newStatus && response.status === 201) || (!newStatus && response.status === 204)) {
        const newFollowedUsers = new Set(followedUsers);
        newStatus ? newFollowedUsers.add(userId) : newFollowedUsers.delete(userId);
        setFollowedUsers(newFollowedUsers);
      }
    } catch (error) {
      console.error("Failed to update follow state:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-4">로딩 중...</div>
      ) : notifications.length === 0 ? (
        <div className="w-full flex justify-center items-center py-4">표시 할 알림 메시지가 없습니다.</div>
      ) : (
        notifications.map((notification) => {
          const timeDifference = getTimeDiff(dayjs(notification.createdAt));
          return (
            <div key={notification.id} className="w-full flex mb-4 hover:bg-slate-100 px-4 py-2 items-center">
              <Link href={`/main/${notification.user.id}`} className="relative w-12 h-12">
                <div className="flex-none w-12 h-12 relative">
                  <Image
                    src={notification.user.profileImgUrl || "/images/userImage.png"}
                    alt="사용자 썸네일"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              </Link>
              <div className="flex-grow ml-2 flex-shrink min-w-0 text-left">
                <span className="text-sm">
                  <button className="text-left" onClick={() => handleLikeClick(notification.feed?.id)}>
                    {notification.type === "LIKE" && (
                      <>
                        <strong>{notification.user.nickName}</strong>님이 게시글을 좋아합니다.
                      </>
                    )}
                  </button>
                  {notification.type === "FOLLOW" && (
                    <>
                      <strong>{notification.user.nickName}</strong>님이 팔로우 하였습니다.
                    </>
                  )}
                  <button className="text-left" onClick={() => handleReplyClick(notification.reply?.feedId)}>
                    {notification.type === "REPLY" && (
                      <>
                        <strong>{notification.user.nickName}</strong>
                        <span className="mr-2">님이 댓글을 남겼습니다:</span>
                        <span>{notification.reply?.content}</span>
                      </>
                    )}
                  </button>
                </span>
              </div>
              <div className="flex-none ml-2">
                <span className="text-xs text-gray-500 mr-2">{timeDifference}</span>
              </div>
              <div className="flex-none relative ml-2">
                {notification.type === "FOLLOW" ? (
                  followedUsers.has(notification.user.id) ? (
                    <button
                      style={{ width: "64px", height: "32px" }}
                      className="flex justify-center items-center rounded bg-gray-500 text-white"
                      onClick={() => updateFollowStatus(notification.user.id, false)}
                    >
                      팔로잉
                    </button>
                  ) : (
                    <button
                      style={{ width: "64px", height: "32px" }}
                      className="flex justify-center items-center rounded bg-blue-500 text-white"
                      onClick={() => updateFollowStatus(notification.user.id, true)}
                    >
                      팔로우
                    </button>
                  )
                ) : (
                  <div className="w-12 h-12 cursor-pointer">
                    <Image
                      src={
                        notification.type === "LIKE"
                          ? notification.feed?.thumbnail || "/images/userImage.png"
                          : notification.type === "REPLY"
                          ? notification.reply?.thumbnail || "/images/userImage.png"
                          : "/images/userImage.png"
                      }
                      alt="피드 썸네일 이미지"
                      layout="fill"
                      objectFit="cover"
                      onClick={() => {
                        if (notification.type === "LIKE") {
                          handleLikeClick(notification.feed?.id);
                        } else if (notification.type === "REPLY") {
                          handleReplyClick(notification.reply?.feedId);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NotificationList;
