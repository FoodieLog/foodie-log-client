import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";

function BackButton() {
  return (
    <div className="absolute top-8">
      <button type="button" className="w-20">
        <BsArrowLeftCircle size="1.7rem" className="hover:text-red" />
      </button>
    </div>
  );
}

export default BackButton;
