import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  variant = "primary",
}) => {
  const variantClasses = clsx({
    "bg-blue-600 hover:bg-blue-700": variant === "primary",
    "bg-gray-600 hover:bg-gray-700": variant === "secondary",
    "bg-red-600 hover:bg-red-700": variant === "danger",
  });

  return (
    <button
      className={twMerge(
        "cursor-pointer text-white py-2 px-4 rounded-lg transition",
        variantClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
