"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogProps } from "@@types/common";
import { deleteFeed } from "@services/feed";
import { useToast } from "@/components/ui/use-toast";
import { MoreVert, SettingsIcon } from "@assets/icons";
import { TOAST_MESSAGES } from "@constants";
import DialogReport from "@components/Common/Dialog/DialogReport";
import DialogConfirm from "@components/Common/Dialog/DialogConfirm";
import useSignUpStore from "@store/useSignUpStore";
import useFeedStore from "@store/useFeedStore";
import useReplyMutation from "@hooks/mutations/useReplyMutation";

function DropDown({ option, feedId = 0, replyId = 0, type = "", content = "", className = "" }: DialogProps) {
  const setNextComponent = useSignUpStore((state) => state.setNextComponent);
  const router = useRouter();
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setFeed = useFeedStore((state) => state.setFeed);
  const { deleteReplyMutation } = useReplyMutation(feedId, replyId);

  const { toast } = useToast();

  let items: string[];
  let onClickHandler: React.MouseEventHandler<HTMLDivElement> | undefined;

  switch (option) {
    case "설정 및 개인정보":
      return (
        <button type="button" onClick={() => router.push("/main/settings")}>
          <SettingsIcon />
        </button>
      );
    case "타인":
      items = ["신고"];
      onClickHandler = () => {
        setShowReportDialog(true);
      };
      break;
    case "본인댓글":
      items = ["삭제"];
      onClickHandler = () => {
        deleteReplyMutation.mutate();
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
    router.push("/main/post");
    setNextComponent("PostContent");
    setFeed({ id: feedId, content });
  };

  const onClickDelete = async () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFeed(feedId);
      toast(TOAST_MESSAGES.FEED_DELETE_SUCCESS);
      setShowConfirmDialog(false);
    } catch (error) {
      toast(TOAST_MESSAGES.FEED_DELETE_FAILURE);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVert />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-[81px] bg-gray-0 border border-gray-2  rounded-[5px] flex flex-col justify-between items-center ${className}`}
        >
          {items?.map((item, i) => (
            <DropdownMenuItem
              key={item}
              onClick={onClickHandler ? onClickHandler : i === 0 ? onClickEdit : onClickDelete}
              className={`w-[71px] h-[39px] cursor-pointer text-base font-normal flex justify-center ${className} ${
                i !== items.length - 1 && "border-b"
              }`}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogReport
        id={type === "게시글" ? feedId : replyId}
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
