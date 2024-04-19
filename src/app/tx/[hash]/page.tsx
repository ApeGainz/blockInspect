"use client";

import { useTransaction, useTransactionReceipt } from "wagmi";
import { useRouter, useSearchParams } from "next/navigation";
import { ethereumString, polygonString, shortenHash } from "@/app/utils";
import PrimaryButton from "@/app/components/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import Title from "@/app/components/Title";
import Subtitle from "@/app/components/Subtitle";
import { mainnet, polygon } from "wagmi/chains";
import { formatEther } from "viem";
import TxRow from "@/app/components/TxRow";
import { TransactionDetail } from "@/app/types";
import Link from "next/link";

const TxHashPage = ({ params }: { params: { hash: `0x${string}` } }) => {
  const hash: `0x${string}` = params.hash;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentChain, setCurrentChain] = useState(
    searchParams.get("chain") || ethereumString.toLowerCase(),
  );
  const [txDetails, setTxDetails] = useState<TransactionDetail>();

  const isPolygon = currentChain === polygonString.toLowerCase();

  const { data, isLoading } = useTransaction({
    hash,
    chainId: isPolygon ? polygon.id : mainnet.id,
  });

  const { isPending, isSuccess, failureCount, status, failureReason } =
    useTransactionReceipt({
      hash,
      chainId: isPolygon ? polygon.id : mainnet.id,
    });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleTxSearch = (txHash: string, chain: string) => {
    if (txHash) {
      setCurrentChain(chain);
      router.push(`/tx/${txHash}?chain=${chain}`);
    }
  };

  useEffect(() => {
    if (data && isPending) {
      const txObject: TransactionDetail = {
        txHash: data.hash,
        from: data.from,
        to: data.to ?? "Not applicable",
        value: data.value.toString(),
        status: "Confirming",
        blockExplorer: `https://etherscan.io/tx/${data.hash}`,
      };
      setTxDetails(txObject);
    } else if (data && isSuccess) {
      const txObject: TransactionDetail = {
        txHash: data.hash,
        from: data.from,
        to: data.to ?? "Not applicable",
        value: data.value.toString(),
        status: "Confirmed",
        blockNumber: Number(data.blockNumber.toString()),
        blockExplorer: `https://etherscan.io/tx/${data.hash}`,
      };
      setTxDetails(txObject);
    }
  }, [isPending, isSuccess, data?.from, data?.blockNumber]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 lg:w-[50%] mx-auto h-auto ">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Title text="Transaction Details" />
        <Subtitle text="Track transactions, read data and get a confirmation as soon as it completes" />
      </div>
      <div className="w-full pt-10 flex flex-col gap-2">
        <div className="text-neutral-200 uppercase text-xs">
          Search for another transaction
        </div>
        <div className="bg-neutral-50 items-center w-full flex gap-4 rounded-md px-2 py-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className="rounded-lg px-4 py-1 w-full text-neutral-850 "
              placeholder="0x3d...x89s"
            />
          </div>
          <div className="flex-end w-auto">
            <div className="flex gap-2">
              <PrimaryButton
                isPolygon={true}
                onClick={() =>
                  handleTxSearch(
                    inputRef.current?.value ?? "",
                    polygonString.toLowerCase(),
                  )
                }
              >
                <span className="material-symbols-outlined">search</span>
              </PrimaryButton>
              <PrimaryButton
                isPolygon={false}
                onClick={() =>
                  handleTxSearch(
                    inputRef.current?.value ?? "",
                    ethereumString.toLowerCase(),
                  )
                }
              >
                <span className="material-symbols-outlined">search</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      {txDetails && !isLoading && (
        <div className="flex flex-col gap-y-4 pt-16 text-neutral-200 w-full">
          <div>
            Transaction chain&nbsp;
            {currentChain === polygonString.toLowerCase()
              ? polygonString
              : ethereumString}
          </div>
          <TxRow title={"Sender"} value={shortenHash(txDetails.from)} />
          <TxRow title={"Sent to"} value={shortenHash(txDetails.to)} />
          <TxRow
            title={"Amount"}
            value={`${formatEther(BigInt(txDetails.value))} ${isPolygon ? polygonString : ethereumString}`}
          />
          {txDetails.blockNumber && (
            <div className="flex justify-between">
              <div className="flex">Block number:</div>
              <div className="flex">{txDetails.blockNumber.toString()}</div>
            </div>
          )}
          <TxRow title={"Status"} value={txDetails.status} />
          <div className="flex justify-between">
            <div className="flex">Explorer Link:</div>
            <div className="flex">
              <Link
                href={`https://${isPolygon ? "polygonscan.com" : "etherscan.io"}/tx/${txDetails.txHash}`}
                target="_blank"
              >
                {shortenHash(txDetails.txHash)}
              </Link>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !txDetails && (
        <div className="text-neutral-200">
          Tx not found please try searching again
        </div>
      )}
    </div>
  );
};

export default TxHashPage;
