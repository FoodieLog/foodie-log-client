import React from "react";

interface SettingListItemProps {
  text: string;
  icon: React.FunctionComponent;
  onClickHandler?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function SettingListItem({ text, icon, onClickHandler, children, className }: SettingListItemProps) {
  const IconComponent = icon;
  return (
    <li onClick={onClickHandler} className={`flex items-center px-[20px] py-[23px] hover:bg-gray-2 ${className}`}>
      <IconComponent />
      <span className="ml-1.5">{text}</span>
      {children}
    </li>
  );
}

export default SettingListItem;
