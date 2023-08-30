import { create } from "zustand";

interface KakaoStore {
  code: string | null;
  setCode: (code: string | null) => void;
}

const useKakaoStore = create<KakaoStore>((set) => ({
  code: "",
  setCode: (newData) => set({ code: newData }),
}));

export default useKakaoStore;
