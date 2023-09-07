import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface MenuProps {
  name: string;
  option: string;
}

function DropDown({ name, option }: MenuProps) {
  const router = useRouter();

  const onClickHandler = () => {
    if (option === "설정 및 개인정보") {
      router.push("/main/settings");
      return;
    } else if (option === "신고") {
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PiDotsThreeOutlineLight size="1.2rem" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absoluteright-3 bg-white">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-100" />
        <DropdownMenuItem onClick={onClickHandler} className="cursor-pointer">
          {option}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
