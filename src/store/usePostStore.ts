import { create } from "zustand";
import { PostStore } from "@/src/types/post";

export const initialContent = {
  id: "",
  place_name: "",
  place_url: "",
  category_name: "",
  address_name: "",
  road_address_name: "",
  phone: "",
  x: "",
  y: "",
};

const usePostStore = create<PostStore>((set) => ({
  content: initialContent,
  files: [],
  previews: [],
  setContent: (selectedContent) => set({ content: selectedContent }),
  setFiles: (selectedFiles) => set({ files: selectedFiles }),
  setPreviews: (selectedPreviews) => set({ previews: selectedPreviews }),
  resetContent: () =>
    set({
      content: initialContent,
      files: [],
      previews: [],
    }),
}));

export default usePostStore;
