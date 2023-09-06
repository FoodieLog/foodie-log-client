import React from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { BsArrowLeftCircle } from "react-icons/bs";
import useSignUpStore from "../../../store/useSignUpStore";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  type: string;
  back: "preComponent" | "prePage";
}

function Header({ title, type, back }: HeaderProps) {
  const router = useRouter();
  let icon;

  switch (type) {
    case "circle":
      icon = <BsArrowLeftCircle size="1.5rem" />;
      break;
    case "arrow":
      icon = <LiaAngleLeftSolid size="1.5rem" />;
      break;
    default:
      icon = null;
  }

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (back === "preComponent") {
      const setNextComponent = useSignUpStore.getState().setNextComponent;
      setNextComponent("");
    } else if (back === "prePage") {
      router.back();
    }
  };

  return (
    <header className="w-full p-5 flex items-center justify-between">
      <button type="button" className="" onClick={onClickHandler}>
        {icon}
      </button>
      <h4>{title}</h4>
      <div></div>
    </header>
  );
}

export default Header;
