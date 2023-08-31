import {create} from 'zustand';

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


export const useUserStore = create<UserState>((set) => ({
  user: {
    id: undefined,
    nickName: undefined,
    profileImageUrl: undefined,
    accessToken: undefined
  },
  setUser: (user) => set(prevState => ({
    ...prevState,
    user: {
      id: user.id,
      nickName: user.nickName,
      profileImageUrl: user.profileImageUrl,
      accessToken: user.accessToken
    }
  })),

  clearUser: () => set(prevState => ({
    ...prevState,
    user: {
      id: undefined,
      nickName: undefined,
      profileImageUrl: undefined,
      accessToken: undefined
    }
  }))
}));