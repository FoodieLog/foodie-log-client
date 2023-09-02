import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

interface MenuProps {
  name: string;
  menuList: string[];
}
function DropDown({ name, menuList }: MenuProps) {
  const onClickHandler = () => {
    if (menuList.length > 1) {
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
        {menuList.map((item, i) => (
          <DropdownMenuItem key={i} onClick={onClickHandler}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
