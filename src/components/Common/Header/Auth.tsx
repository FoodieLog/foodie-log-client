import useSignUpStore from "@/src/store/useSignUpStore";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
function AuthHeader() {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setNextComponent("");
  };
  return (
    <button type="button" onClick={onClickHandler} className="flex justify-end hover:text-red-500">
      <AiOutlineClose size="1.7rem" />
    </button>
  );
}

export default AuthHeader;
