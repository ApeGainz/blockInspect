import React from "react";
import { useBalance } from "wagmi";
import { type UseBalanceReturnType } from "wagmi";
import { formatUnits } from "viem";
import { mainnet, polygon } from "wagmi/chains";

const UserBalance: React.FC<{ address: `0x${string}`; isPolygon: boolean }> = ({
  address,
  isPolygon,
}) => {
  const balance: UseBalanceReturnType = useBalance({
    address,
    chainId: isPolygon ? polygon.id : mainnet.id,
  });

  return (
    <div>
      {balance.data && (
        <div>
          Wallet balance{" "}
          {formatUnits(balance.data.value, balance.data.decimals).substring(
            0,
            5,
          )}
          &nbsp;
          {balance.data.symbol}
        </div>
      )}
    </div>
  );
};

export default UserBalance;
