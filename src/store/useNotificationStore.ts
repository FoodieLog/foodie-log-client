import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Notification } from "@@types/settings";

type NotificationStore = {
  checkStatus: Notification;
  setCheckStatus: (value: Notification) => void;
};

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      checkStatus: {
        replyFlag: "Y",
        likeFlag: "Y",
        followFlag: "Y",
      },
      setCheckStatus: (data: Notification) => set((pre) => ({ checkStatus: { ...pre.checkStatus, ...data } })),
    }),
    {
      name: "notification",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNotificationStore;
