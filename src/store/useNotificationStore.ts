import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Notification = {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
};

const useNotificationStore = create<Notification>()(
  persist(
    (set) => ({
      isChecked: false,
      setIsChecked: (data: boolean) => set({ isChecked: data }),
    }),
    {
      name: "notification",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNotificationStore;
