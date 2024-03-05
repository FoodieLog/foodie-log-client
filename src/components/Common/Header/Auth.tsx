import useSignUpStore from "@store/useSignUpStore";
import React from "react";
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";

function AuthHeader({ back }: { back: string }) {
  const router = useRouter();
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (back === "preComponent") {
      return setNextComponent("");
    } else if (back === "prePage") {
      return router.back();
    }
  };
  return (
    <button type="button" onClick={onClickHandler} className="my-3 w-full flex hover:text-red-500">
      <BsArrowLeftCircle size="1.7rem" />
    </button>
  );
}

export default AuthHeader;
