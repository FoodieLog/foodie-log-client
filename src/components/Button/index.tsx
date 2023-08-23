// interface IButtonProps {
//   label: string;
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
// }

// function Button({ label, onClick }: IButtonProps) {
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={onClick}
//         className={"w-full h-[45px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-lg "}
//       >
//         {label}
//       </button>
//     </div>
//   );
// }

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "w-full py-3",
  onClick,
  children,
}: ButtonProps) => {
  let variantStyles = "";

  switch (variant) {
    case "primary":
      variantStyles = "bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 mt-1 rounded-lg";
      break;
    case "secondary":
      variantStyles =
        "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded";
      break;
  }

  return (
    <button className={`${variantStyles} ${size}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
