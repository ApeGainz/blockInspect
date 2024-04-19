import React from "react";

const Subtitle: React.FC<{
  text: string;
  className?: string;
  small?: boolean;
}> = ({ text, className, small = false }) => {
  return (
    <div
      className={`${small ? "lg:text-xs text-[9px]" : "lg:text-sm text-[10px]"} tracking-widest font-light uppercase text-neutral-200 ${className}`}
    >
      {text}
    </div>
  );
};

export default Subtitle;
