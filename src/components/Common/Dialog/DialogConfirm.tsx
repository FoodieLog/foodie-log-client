"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogConfirmProps } from "@/src/types/common";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{content}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">
            취소
          </Button>
          <Button variant="default" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirm;
