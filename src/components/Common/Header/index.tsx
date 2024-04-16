"use client";
import DropDown from "@components/Common/DropDown/DropDown";
import useSignUpStore from "@store/useSignUpStore";
import usePostStore from "@/src/store/usePostStore";
import ArrowBack_IOS from "@assets/icons/common/arrow_back_ios.svg";
import { useRouter } from "next/navigation";
import { HeaderProps } from "@/src/types/common";

function Header({ title = "", back, option }: HeaderProps) {
  const router = useRouter();
  const setFiles = usePostStore((state) => state.setFiles);

  const clickBackBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <header className={`grid grid-cols-3 max-sm:max-w-[640px] w-full h-[56px] items-center justify-between`}>
      <button type="button" onClick={clickBackBtnHandler}>
        <ArrowBack_IOS color="#363232" />
      </button>
      <h4 className={`whitespace-nowrap min-w-[min-content] font-medium justify-self-center`}>{title}</h4>
      <div className={`flex items-center justify-self-end mr-[14px]`}>
        {option ? <DropDown name={title} option={option} className="w-full" /> : null}
      </div>
    </header>
  );
}

export default Header;
