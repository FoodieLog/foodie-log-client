"use client";
import { useEffect } from "react";
import { ModalProps } from "@/src/types/common";

function CustomModal({ children, showModal, setShowModal, reload }: ModalProps) {
  useEffect(() => {}, [reload]);

  const onClickBg = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (setShowModal && e.target === e.currentTarget) {
      setShowModal(!showModal);
    }
  };

  return (
    <div
      onClick={onClickBg}
      className="bg-gray-300 bg-opacity-50 fixed w-screen h-screen flex justify-center items-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">{children}</div>
      </div>
    </div>
  );
}

export default CustomModal;
