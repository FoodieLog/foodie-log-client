import React from "react";
import { WarningCircle } from "@assets/icons";

interface ErrorTextProps {
  text: string | undefined;
}

function ErrorText({ text }: ErrorTextProps) {
  return (
    <span className="flex items-center text-sm text-red mt-2">
      <WarningCircle />
      {text}
    </span>
  );
}

export default ErrorText;
