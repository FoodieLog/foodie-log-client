import React from "react";
interface IButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, onClick }: IButtonProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={"w-full h-[45px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-lg "}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
