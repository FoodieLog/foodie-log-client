import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Keyword {
  id: number;
  keyword: string;
}

type SearchStore = {
  searchHistory: Keyword[];
  setSearchHistory: (data: Keyword) => void;
  deleteSearchHistory: (id: number) => void;
};

const useUserStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchHistory: [],
      setSearchHistory: (data) =>
        set((pre) => ({
          searchHistory: [...pre.searchHistory, data],
        })),
      deleteSearchHistory: (id) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((value) => value.id !== id),
        })),
    }),
    {
      name: "user-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
