"use client";
import { Notification } from "@@types/apiTypes";
import NotifItem from "@components/Notification/NotifItem";
import useNotificationQuery from "@hooks/queries/useNotificationQuery";

const NotificationList = () => {
  const { data: notifications } = useNotificationQuery();

  return (
    <ul className="w-full flex flex-col">
      {notifications?.length === 0 ? (
        <li className="w-full flex justify-center items-center py-4">알림이 없습니다.</li>
      ) : (
        notifications?.map((notification: Notification) => <NotifItem key={notification.id} {...notification} />)
      )}
    </ul>
  );
};

export default NotificationList;
