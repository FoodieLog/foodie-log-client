import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import useSignUpStore from "@/src/store/useSignUpStore";
import DialogReport from "@/src/components/Common/Dialog/DialogReport";
import DialogConfirm from "@/src/components/Common/Dialog/DialogConfirm";
import { deleteFeed } from "@/src/services/apiFeed";
import { useToast } from "@/components/ui/use-toast";
import useFeedStore from "@/src/store/useFeedStore";
import { DialogProps } from "@/src/types/common";

function DropDown({ name, option, id = 0, type = "", content = "", removeDeletedFeed }: DialogProps) {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setFeed = useFeedStore((state) => state.setFeed);

  const { toast } = useToast();

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
        setShowReportDialog(true);
      };
      break;
    case "본인댓글":
      items = [];
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
    setFeed({ id, content });
  };

  const onClickDelete = async () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteFeed(id);

      toast({ description: "피드가 정상 삭제 되었습니다👍!" });
      setShowConfirmDialog(false);
    } catch (error) {
      toast({ description: "게시글 삭제 중 에러가 발생했습니다. 다시 시도해주세요!🙄" });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDotsVertical size="1rem" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
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
      <DialogReport
        id={id}
        name={name}
        type={type}
        isOpened={showReportDialog}
        onClose={() => setShowReportDialog(false)}
      />
      <DialogConfirm
        isOpened={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
        content="게시글을 정말로 삭제하시겠습니까?"
      />
    </>
  );
}

export default DropDown;
