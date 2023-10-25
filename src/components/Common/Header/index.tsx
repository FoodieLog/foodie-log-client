import React from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { BsArrowLeftCircle } from "react-icons/bs";
import useSignUpStore from "../../../store/useSignUpStore";
import { useRouter } from "next/navigation";
import DropDown from "../DropDown/DropDown";
import usePostStore from "@/src/store/usePostStore";
import { HeaderProps } from "@/src/types/common";

function Header({ title, type, back, option }: HeaderProps) {
  console.log("타이틀", title);
  const router = useRouter();
  const setFiles = usePostStore((state) => state.setFiles);
  let headerStyle;
  let titleStyle;
  let icon;

  switch (type) {
    case "left":
      headerStyle = `relative`;
      titleStyle = `ml-2`;
      icon = `absolute right-5`;
      break;
    case "arrow":
      headerStyle = `justify-between`;
      titleStyle = ``;
      icon = ``;
      break;
    default:
      headerStyle = null;
      titleStyle = ``;
      icon = ``;
  }

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (back === "preComponent") {
      const setNextComponent = useSignUpStore.getState().setNextComponent;
      setNextComponent("");
      setFiles([]);
    } else if (back === "prePage") {
      router.back();
    }
  };

  return (
    <header className={`grid grid-cols-3 max-sm:max-w-[640px] w-full px-5 pt-5 pb-1 items-center ${headerStyle}`}>
      <button type="button" onClick={onClickHandler}>
        <LiaAngleLeftSolid size="1.5rem" />
      </button>
      <h4 className={`${titleStyle} font-medium justify-self-center`}>{title}</h4>
      <div className={`${icon} justify-self-end`}>{option ? <DropDown name={title} option={option} /> : null}</div>
    </header>
  );
}

export default Header;
