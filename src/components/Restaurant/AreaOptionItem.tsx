import { AreaOptionItemProps } from "@/src/types/recommend";

const AreaOptionItem: React.FC<AreaOptionItemProps> = ({ optionItem }) => {
  return <option value={optionItem}>{optionItem}</option>;
};

export default AreaOptionItem;
