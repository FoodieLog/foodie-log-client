import BackButtonMain from "@/src/components/Common/Button/BackButtonMain";
import NotificationList from "@/src/components/Notification/NotificationList";

const NotificationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-sm mx-auto">
      <BackButtonMain />
      <NotificationList />
    </div>
  );
};

export default NotificationPage;
