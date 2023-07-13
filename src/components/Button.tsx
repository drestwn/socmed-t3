import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: String;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  small = false,
  gray = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-200"
    : "bg-blue-400 hover:bg-blue-300 focus-visible:bg-blue-200";
  return (
    <button
      className={`transition-colors-duration-200 rounded-full text-white disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
}
