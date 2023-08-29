import {create} from 'zustand';
import { UserResponse } from '@/src/types/apiTypes';

type UserState = {
  id? : number;
  nickName?: string;
  profileImageUrl?: string | null;
  accessToken?: string;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  id: undefined,
  nickName: undefined,
  profileImageUrl: undefined,
  accessToken: undefined,

  setUser: (user) => set({
    id: user.id,
    nickName: user.nickName,
    profileImageUrl: user.profileImageUrl,
    accessToken: user.accessToken
  }),

  clearUser: () => set({
    id: undefined,
    nickName: undefined,
    profileImageUrl: undefined,
    accessToken: undefined
  })
}));