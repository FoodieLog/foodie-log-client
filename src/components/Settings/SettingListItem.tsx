import CaretRight from "@assets/icons/common/CaretRight.svg";

interface SettingListItemProps {
  text: string;
  icon?: boolean;
  onClickHandler?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function SettingListItem({ text, icon = true, onClickHandler, children, className }: SettingListItemProps) {
  return (
    <li
      onClick={onClickHandler}
      className={`${className} flex justify-between items-center px-5 py-6 font-bold border-b border-gray-1`}
    >
      <span className="ml-1.5">{text}</span>
      {children}
      {icon && <CaretRight />}
    </li>
  );
}

export default SettingListItem;
