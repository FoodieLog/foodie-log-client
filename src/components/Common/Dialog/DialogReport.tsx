import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { reportFeed, reportReply } from "@/src/services/apiFeed";
import { useToast } from "@/components/ui/use-toast";
import { DialogReportProps } from "@/src/types/common";

const translateReportReason = (reason: string): string => {
  switch (reason) {
    case "광고":
      return "ADVERTISEMENT";
    case "욕설":
      return "SWEARING";
    case "음란행위":
      return "OBSCENITY";
    case "명예훼손":
      return "DEFAMATION";
    case "기타":
      return "ETC";
    default:
      return "ETC"; // 기본값, 에러 처리를 위해 ETC로 설정
  }
};

const DialogReport = ({ id, name, type, isOpened = false, onClose }: DialogReportProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpened);
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [details, setDetails] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setIsDialogOpen(isOpened);
  }, [isOpened]);

  const handleSubmitReport = async () => {
    try {
      if (!reason) {
        alert("신고 사유를 선택해주세요.");
        return;
      }

      const translatedReason = translateReportReason(reason);
      const combinedReportReason = `${translatedReason}${details ? "," + details : ""}`;
      console.log(id, name, combinedReportReason);
      if (type === "게시글") {
        await reportFeed(id, combinedReportReason);
      } else if (type === "댓글") {
        await reportReply(id, combinedReportReason);
      }
      toast({ title: "신고정상 접수", description: "신고가 정상 접수 되었습니다." });
      // alert("신고가 정상 접수 되었습니다.");
      onClose();
    } catch (error) {
      console.error(error);
      alert("신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(openState) => {
        if (!openState) {
          onClose(); // Dialog가 닫혔을 때
        }
        setIsDialogOpen(openState);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type} 신고</DialogTitle>
          <DialogDescription>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlineCustom">신고사유(필수선택)</Button>
              </DropdownMenuTrigger>
              {reason ? `✅ ${reason}` : null}
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={reason} className="bg-slate-100 opacity-90" onValueChange={setReason}>
                  <DropdownMenuRadioItem value="광고">광고</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="욕설">욕설</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="음란행위">음란행위</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="명예훼손">명예훼손</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="기타">기타</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogDescription>

          {/* <DialogDescription>
            {option} 상세내용(선택사항)
            {details && " ✅"}
            <input
              type="text"
              value={details}
              maxLength={150}
              onChange={(e) => setDetails(e.target.value)}
              className="border p-2 mt-2 w-full"
            />
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button onClick={handleSubmitReport} disabled={!reason}>
            신고 제출
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogReport;
