import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id?: number;
  nickName?: string;
  profileImageUrl?: string | null;
  accessToken?: string;
  tokenExpiry?: number; // 유닉스 타임스탬프로 만료 시간 저장
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
        nickName: undefined,
        profileImageUrl: undefined,
        accessToken: undefined,
        tokenExpiry: undefined, // 초기 만료 시간은 undefined로 설정
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
            nickName: undefined,
            profileImageUrl: undefined,
            accessToken: undefined,
            tokenExpiry: undefined,
          },
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
