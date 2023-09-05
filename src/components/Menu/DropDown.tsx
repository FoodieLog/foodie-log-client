import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
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
        <BsThreeDotsVertical size="1.2rem" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClickHandler} className="cursor-pointer">
          {option}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
