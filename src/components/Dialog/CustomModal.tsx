"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
}

function CustomModal({ children, showModal, setShowModal, reload }: ModalProps) {
  useEffect(() => {}, [reload]);

  const onClickBg = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(!showModal);
    }
  };
  return (
    <div
      onClick={onClickBg}
      className="fixed w-screen flex justify-center items-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">{children}</div>
      </div>
    </div>
  );
}

export default CustomModal;
