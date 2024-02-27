import Header from "@components/Common/Header";
import NotificationList from "@/src/components/Notification/NotificationList";

const NotificationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <Header title="알림" back="prePage" />
      <NotificationList />
    </div>
  );
};

export default NotificationPage;
