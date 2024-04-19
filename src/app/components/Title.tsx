import React from "react";

const Title: React.FC<{
  text: string;
  small?: boolean;
  className?: string;
}> = ({ text, small = false, className = "" }) => {
  return (
    <div
      className={`${small ? "lg:text-5xl text-2xl" : "lg:text-7xl text-4xl"} tracking-wide font-medium uppercase text-neutral-50 ${className}`}
    >
      {text}
    </div>
  );
};

export default Title;
