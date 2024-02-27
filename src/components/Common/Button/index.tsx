import { ButtonProps } from "@@types/common";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "w-full p-[10px] text-white bg-red font-[18px] rounded-[8px]";
      break;
    case "secondary":
      variantStyles = "w-full p-[10px] bg-white font-[18px] font-gray-2 border border-gray-2 rounded-[8px]";
      break;
    case "text":
      variantStyles = "underline underline-offset-5";
      break;
  }

  return (
    <button
      type={type}
      className={disabled ? `w-full p-[10px] text-gray-4 bg-gray-2 font-[18px] rounded-[8px]` : `${variantStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
