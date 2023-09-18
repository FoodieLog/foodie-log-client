import React from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { BsArrowLeftCircle } from "react-icons/bs";
import useSignUpStore from "../../../store/useSignUpStore";
import { useRouter } from "next/navigation";
import DropDown from "../../Common/Menu/DropDown";
import usePostStore from "@/src/store/usePostStore";

interface HeaderProps {
  title: string;
  type: string;
  back: "preComponent" | "prePage";
  option?: string;
}

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
    <header className={`max-sm:max-w-[640px] w-full px-5 pt-5 pb-1 flex items-center ${headerStyle}`}>
      <button type="button" className="" onClick={onClickHandler}>
        <LiaAngleLeftSolid size="1.5rem" />
      </button>
      <h4 className={`${titleStyle} font-medium`}>{title}</h4>
      <div className={`${icon}`}>{option ? <DropDown name={title} option={option} /> : null}</div>
    </header>
  );
}

export default Header;
