"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogConfirmProps } from "@/src/types/common";
import Button from "@components/Common/Button";

const DialogConfirm = ({ content, isOpened, onClose, onConfirm }: DialogConfirmProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpened);

  useEffect(() => {
    setIsDialogOpen(isOpened);
  }, [isOpened]);

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
      <DialogContent className="max-w-[300px] sm:max-w-[418px] bg-gray-0 rounded-[8px]">
        <DialogHeader>
          <DialogTitle className="text-center">{content}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center mt-4 gap-[10px]">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="button" variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirm;
