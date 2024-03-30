import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { reportFeed } from "@services/feed";
import { reportReply } from "@services/reply";
import { useToast } from "@/components/ui/use-toast";
import { DialogReportProps } from "@@types/common";
import { REPORT_RESEASON, TOAST_MESSAGES } from "@constants";

const DialogReport = ({ id, type, isOpened = false, onClose }: DialogReportProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpened);
  const [reason, setReason] = useState<string | undefined>(undefined);

  const { toast } = useToast();

  useEffect(() => {
    setIsDialogOpen(isOpened);
  }, [isOpened]);

  const handleSubmitReport = async () => {
    try {
      if (!reason) {
        return alert("신고 사유를 선택해주세요.");
      }

      const reportReason = REPORT_RESEASON[reason];

      if (type === "게시글") {
        await reportFeed(id, reportReason);
      } else if (type === "댓글") {
        await reportReply(id, reportReason);
      }
      toast(TOAST_MESSAGES.REPORT_SUCCESS);
      onClose();
    } catch (error) {
      toast(TOAST_MESSAGES.REPORT_FAILURE);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(openState) => {
        if (!openState) {
          onClose();
        }
        setIsDialogOpen(openState);
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-gray-0">
        <DialogHeader>
          <DialogTitle>{type} 신고</DialogTitle>
          <DialogDescription>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlineCustom">
                  신고사유<span className="text-red">*</span>
                </Button>
              </DropdownMenuTrigger>
              {reason ? `${reason}` : null}
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={reason} className="bg-slate-100 opacity-90" onValueChange={setReason}>
                  {["광고", "욕설", "음란행위", "명예훼손", "기타"].map((reason) => (
                    <DropdownMenuRadioItem key={reason} value={reason}>
                      {reason}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogDescription>
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
