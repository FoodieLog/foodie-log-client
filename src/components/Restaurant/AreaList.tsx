import { AreaListProps } from "@/src/types/recommend";
import AreaOptionItem from "./AreaOptionItem";

const AreaList: React.FC<AreaListProps> = ({ optionList }) => {
  return (
    <>
      <option value="">선택</option>
      {optionList.map((optionItem) => (
        <AreaOptionItem key={optionItem} optionItem={optionItem} />
      ))}
    </>
  );
};

export default AreaList;
