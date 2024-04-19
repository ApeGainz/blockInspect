import React, { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = {
  isPolygon?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isPolygon = false,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`py-1 px-4 ${isPolygon ? "bg-brand-purple text-neutral-50" : "bg-brand-green text-neutral-850"} hover:cursor-pointer rounded-md tracking-wider uppercase font-xs w-full`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
