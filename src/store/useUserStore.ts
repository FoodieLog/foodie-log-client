import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id?: number;
  nickName?: string;
  profileImageUrl?: string | null;
  accessToken?: string;
};

type UserState = {
  user: User;
  setUser: (user: User) => void;
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
      },
      setUser: (user: User) =>
        set(prevState => ({
          ...prevState,
          user: {
            id: user.id,
            nickName: user.nickName,
            profileImageUrl: user.profileImageUrl,
            accessToken: user.accessToken,
          }
        })),
      clearUser: () => 
        set(prevState => ({
          ...prevState,
          user: {
            id: undefined,
            nickName: undefined,
            profileImageUrl: undefined,
            accessToken: undefined,
          }
        }))
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

