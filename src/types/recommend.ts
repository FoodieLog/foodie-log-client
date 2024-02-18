export type AreaType = {
  [key: string]: {
    [key: string]: string[];
  };
};

export interface AreaSelectorProps {
  onSelectedAreaChange?: (searchQuery: string) => void;
}

export interface AreaListProps {
  optionList: string[];
}

export interface AreaOptionItemProps {
  optionItem: string;
}
