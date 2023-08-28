import { ReactHTMLElement, ReactNode } from "react";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";
// interface SignUpStore {
//   email?: string;
//   password?: string;
//   nickName?: string;
//   profileImageName?: string;
//   aboutMe?: string;
//   setEmail: (data: string) => void;
//   setPassword: (data: string) => void;
//   setNickName: (data: string) => void;
//   setProfileImageName: (data: string) => void;
//   setAboutMe: (data: string) => void;
// }

interface SignUpStore {
  user: SignUpData;
  isChecked: boolean;
  nextComponent: React.ReactNode;
  setUser: (data: SignUpData) => void;
  setIsChecked: (data: boolean) => void;
  setNextComponent: (data: string) => void;
}
interface SignUpData {
  email: string;
  password: string;
}
const useSignUpStore = create<SignUpStore>((set) => ({
  user: {
    email: "",
    password: "",
  },
  isChecked: false,
  nextComponent: "",
  setUser: (newData) => set({ user: newData }),
  setIsChecked: (data) => set({ isChecked: data }),
  setNextComponent: (data) => set({ nextComponent: data }),
}));

// const useSignUpStore = create<SignUpStore>((set) => ({
// user : {
//   email: "",
//   password: "",
//   nickName: "",
//   profileImageName: "",
//   aboutMe: "",
// }
//   setEmail: (data: string) => set({ email: data }),
//   setPassword: (data: string) => set({ password: data }),
//   setNickName: (data: string) => set({ nickName: data }),
//   setProfileImageName: (data: string) => set({ profileImageName: data }),
//   setAboutMe: (data: string) => set({ aboutMe: data }),
// }));

export default useSignUpStore;
