import { AreaListProps } from "@@types/recommend";
import AreaOptionItem from "@components/Restaurant/AreaOptionItem";

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
