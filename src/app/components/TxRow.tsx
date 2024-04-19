import { shortenHash } from "@/app/utils";
import React from "react";

const TxRow: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex">{title}:</div>
      <div className="flex">{value}</div>
    </div>
  );
};

export default TxRow;
