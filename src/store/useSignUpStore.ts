import { create } from "zustand";

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

export default useSignUpStore;
