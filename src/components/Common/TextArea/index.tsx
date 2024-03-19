import React from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength: number;
  title?: string;
  className?: string;
}

function TextArea({ maxLength, title, className, ...props }: TextAreaProps) {
  const { id, value } = props;
  return (
    <div className="relative">
      <label htmlFor={id} className="start-4 absolute top-2.5 left-2.5 text-xs text-gray-4">
        {title}
      </label>
      <textarea {...props} className={cn("w-full h-[162px] resize-none focus:outline-none", className)} />
      <p className="absolute bottom-3.5 right-2.5 text-sm text-gray-3">
        {value?.toString().length}/{maxLength}
      </p>
    </div>
  );
}

export default TextArea;
