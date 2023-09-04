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
  menuList: string[];
}

function DropDown({ name, menuList }: MenuProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push("/main/settings");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical size="1.2rem" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuList.map((item, i) => (
          <DropdownMenuItem key={i} onClick={onClickHandler} className="cursor-pointer">
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
