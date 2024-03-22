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
      variantStyles = "redBtn";
      break;
    case "secondary":
      variantStyles = "borderGrayBtn";
      break;
    case "text":
      variantStyles = "text-red text-sm";
      break;
  }

  return (
    <button
      type={type}
      className={disabled && variant !== "text" ? `grayBtn` : `${variantStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
