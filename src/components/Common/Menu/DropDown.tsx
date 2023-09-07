import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import DialogReport from "../Dialog/DialogReport";

interface MenuProps {
  name: string;
  option: string;
  id?: number;
}

function DropDown({ name, option, id = 0 }: MenuProps) {
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);

  const onClickHandler = () => {
    if ((name === "게시글" || name === "댓글") && option === "신고") {
      setShowReportDialog(true);
      return;
    } else if (option === "설정 및 개인정보") {
      router.push("/main/settings");
      return;
    } else if (option === "신고") {
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {option === "설정 및 개인정보" ? (
            <PiDotsThreeOutlineLight size="1.2rem" />
          ) : (
            <BsThreeDotsVertical size="1.2rem" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absoluteright-3 bg-white">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100" />
          <DropdownMenuItem onClick={onClickHandler} className="cursor-pointer">
            {option}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showReportDialog && (
        <DialogReport id={id} name={name} option={option} isOpened={true} onClose={() => setShowReportDialog(false)} />
      )}
    </>
  );
}

export default DropDown;
