import React from "react";
import { FormattedTransaction } from "@/app/types";
import Link from "next/link";
import { ethereumString, polygonString, shortenHash } from "@/app/utils";

type WalletTransactionsTableProps = {
  transactions: FormattedTransaction[];
  currentChain: string;
  isLoading: boolean;
};

const WalletTransactionsTable: React.FC<WalletTransactionsTableProps> = ({
  transactions,
  currentChain,
  isLoading,
}) => {
  if (transactions.length === 0 && !isLoading) {
    return <p>No transactions found.</p>;
  }

  return (
    <div className="overflow-x-auto whitespace-break-spaces break-words bg-red-400">
      <div className="w-auto text-neutral-800 lg:text-sm text-xs">
        <div className="bg-neutral-900 text-neutral-200 font-light uppercase">
          <div className="flex text-center items-center">
            <div className="w-1/6 px-2 py-2">Tx Hash</div>
            <div className="w-1/6 px-2 py-2">Date</div>
            <div className="w-1/6 px-2 py-2">
              Amount&nbsp;
              <span className="uppercase">
                {currentChain === ethereumString.toLowerCase()
                  ? `(${ethereumString.substring(0, 3)})`
                  : `(MAT)`}
              </span>
            </div>
            <div className="w-1/6 px-2 py-2">Block</div>
            <div className="w-1/6 px-2 py-2">Confirmations</div>
            <div className="w-1/6 px-2 py-2">Explorer Link</div>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center lg:text-sm uppercase tracking-widest text-[10px] items-center ">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-400"} items-center`}
              >
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
                <div className="w-1/6 px-2 py-2 animate-pulse bg-neutral-300"></div>
              </div>
            ))}
          </div>
        ) : (
          // <div className="h-screen w-screen bg-red-500"></div>
          <div className="text-center lg:text-xs text-[10px] whitespace-break-spaces items-center">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? "bg-neutral-100" : "bg-neutral-400"} items-center`}
              >
                <div className="w-1/6 px-2 py-2">
                  <Link
                    href={`/tx/${transaction.txHash}?chain=${currentChain === polygonString.toLowerCase() ? polygonString.toLowerCase() : ethereumString.toLowerCase()}`}
                    className="underline"
                  >
                    {shortenHash(transaction.txHash)}
                  </Link>
                </div>
                <div className="w-1/6 px-2 py-2">
                  {new Date(transaction.timeStamp).toLocaleDateString()}
                </div>
                <div className="w-1/6 px-2 py-2">
                  {transaction.amount.substring(0, 6)}
                </div>
                <div className="w-1/6 px-2 py-2">{transaction.blockNumber}</div>
                <div className="w-1/6 px-2 py-2">
                  {transaction.confirmations}
                </div>
                <div className="w-1/6 px-2 py-2">
                  <Link
                    href={transaction.blockExplorer}
                    target="_blank"
                    className="underline"
                  >
                    {shortenHash(transaction.txHash)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletTransactionsTable;
