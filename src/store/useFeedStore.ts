import { create } from "zustand";

interface FeedStore {
  feed: Feed;
  setFeed: (data: Feed) => void;
}

interface Feed {
  id: number;
  content: string;
}

const initialState = {
  id: 0,
  content: "",
};

const useFeedStore = create<FeedStore>((set) => ({
  feed: initialState,
  setFeed: (newData) => set({ feed: newData }),
}));

export default useFeedStore;
