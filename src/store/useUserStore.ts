import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id?: number;
  email?: string;
  nickName?: string;
  profileImageUrl?: string | null;
  accessToken?: string;
  kakaoAccessToken?: string;
  tokenExpiry?: number; // 유닉스 타임스탬프로 만료 시간 저장
  notificationFlag?: "Y" | "N";
};

type UserState = {
  user: User;
  setUser: (user: User) => void;
  setTokenExpiry: (expiry: number) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: undefined,
        email: undefined,
        nickName: undefined,
        profileImageUrl: undefined,
        accessToken: undefined,
        kakaoAccessToken: undefined,
        tokenExpiry: undefined, // 초기 만료 시간은 undefined로 설정
        notificationFlag: undefined,
      },
      setUser: (user: User) =>
        set((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            ...user,
          },
        })),
      setTokenExpiry: (expiry: number) =>
        set((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            tokenExpiry: expiry,
          },
        })),
      clearUser: () =>
        set((prevState) => ({
          ...prevState,
          user: {
            id: undefined,
            email: undefined,
            nickName: undefined,
            profileImageUrl: undefined,
            accessToken: undefined,
            kakaoAccessToken: undefined,
            tokenExpiry: undefined,
            notificationFlag: undefined,
          },
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
