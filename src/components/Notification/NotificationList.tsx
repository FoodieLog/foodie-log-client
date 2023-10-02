"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getTimeDiff } from "@/src/utils/date";
import dayjs from "dayjs";
import { getNotificationList } from "@/src/services/apiFeed";
import { Notification } from "../../types/apiTypes";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotificationList();
        console.log("response : ", response);
        setNotifications(response.response.content);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {notifications.map((notification) => {
        const timeDifference = getTimeDiff(dayjs(notification.createdAt));
        return (
          <div key={notification.id} className="w-full flex mb-4 hover:bg-slate-100 px-4 py-2 items-center">
            <div className="flex-none w-12 h-12 relative">
              <Image
                src={notification.user.profileImgUrl || "/images/userImage.png"}
                alt="사용자 썸네일"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-grow ml-2 flex-shrink min-w-0">
              <span className="text-sm">
                <strong>{notification.user.nickName}</strong>님이{" "}
                {notification.type === "LIKE" && "게시글을 좋아합니다."}
                {notification.type === "FOLLOW" && "팔로우 하였습니다."}
                {notification.type === "REPLY" && `댓글을 남겼습니다: "${notification.reply?.content}"`}
              </span>
            </div>
            <div className="flex-none ml-2">
              <span className="text-xs text-gray-500 mr-2">{timeDifference}</span>
            </div>
            <div className="flex-none relative ml-2">
              {notification.type === "FOLLOW" ? (
                <div
                  style={{ width: "64px", height: "32px" }}
                  className="flex justify-center items-center rounded bg-blue-500 text-white"
                >
                  팔로우
                </div>
              ) : (
                <div className="w-12 h-12">
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
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
