import React from "react";
interface IButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ label, onClick }: IButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"w-80 mx-2 my-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"}
    >
      {label}
    </button>
  );
}

export default Button;
