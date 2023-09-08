import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useSignUpStore from "@/src/store/useSignUpStore";

interface MenuProps {
  name: string;
  option: string;
  id?: number;
}

function DropDown({ name, option }: MenuProps) {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);

  let items: string[];
  let onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;

  switch (option) {
    case "설정 및 개인정보":
      items = ["설정 및 개인정보"];
      onClickHandler = () => {
        router.push("/main/settings");
        return;
      };
      break;
    case "타인":
      items = ["신고"];
      onClickHandler = () => {
        alert("신고 api 가 없습니다!");
      };
      break;
    case "본인":
      items = ["수정", "삭제"];
      break;
    default:
      items = [];
  }

  const onClickEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setNextComponent("EditModal");
  };

  const onClickDelete = () => {
    alert("삭제");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical size="1rem" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absoluteright-3 bg-white">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-100" />
        {items?.map((item, i) => (
          <DropdownMenuItem
            key={i}
            onClick={onClickHandler ? onClickHandler : i === 0 ? onClickEdit : onClickDelete}
            className="cursor-pointer"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
