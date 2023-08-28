type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary" | "text";
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "py-2",
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-lg";
      break;
    case "secondary":
      variantStyles =
        "w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded";
      break;
    case "text":
      variantStyles = "underline underline-offset-5";
      break;
  }

  return (
    <button type={type} className={`${variantStyles} ${size}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
