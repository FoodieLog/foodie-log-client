import { create } from "zustand";
import { RegionType } from "@@types/recommend";

interface Recommend {
  selectedRegion: RegionType;
  setSelectedRegion: (data: RegionType) => void;
  resetSelect: () => void;
}

const initialRecommendState: RegionType = {
  city: "수도권",
  doName: "",
  sigungu: "",
};

export const useRecommendStore = create<Recommend>((set) => ({
  selectedRegion: initialRecommendState,
  setSelectedRegion: (newSelectedRegion) => set({ selectedRegion: newSelectedRegion }),
  resetSelect: () =>
    set({
      selectedRegion: initialRecommendState,
    }),
}));
