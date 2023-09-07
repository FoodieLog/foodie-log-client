import { create } from "zustand";

interface PostStore {
  content: PostData;
  setContent: (content: PostData) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  previews: string[];
  setPreviews: (previews: string[]) => void;
}

interface PostData {
  id: string;
  place_name: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
}

const usePostStore = create<PostStore>((set) => ({
  content: {
    id: "",
    place_name: "",
    place_url: "",
    category_name: "",
    address_name: "",
    road_address_name: "",
    phone: "",
    x: "",
    y: "",
  },
  files: [],
  previews: [],
  setContent: (selectedContent) => set({ content: selectedContent }),
  setFiles: (selectedFiles) => set({ files: selectedFiles }),
  setPreviews: (selectedPreviews) => set({ previews: selectedPreviews }),
}));

export default usePostStore;
