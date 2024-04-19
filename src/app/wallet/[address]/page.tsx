"use client";
import { useBlockExplorer } from "@/app/hooks/useBlockExplorer";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Title from "@/app/components/Title";
import Subtitle from "@/app/components/Subtitle";
import { isAddress } from "viem";
import WalletTransactionsTable from "@/app/components/WalletTransactionsTable";
import PrimaryButton from "@/app/components/PrimaryButton";
import { ethereumString, polygonString } from "@/app/utils";
import UserBalance from "@/app/components/UserBalance";

const WalletPage = ({ params }: { params: { address: `0x${string}` } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentAddress, setCurrentAddress] = useState<`0x${string}`>(
    params.address,
  );
  const [currentChain, setCurrentChain] = useState(
    searchParams.get("chain") || ethereumString.toLowerCase(),
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [sortByAsc, setSortByAsc] = useState<boolean>(true);

  const isPolygon = currentChain === polygonString.toLowerCase();
  const { isLoading, apiData, error, formattedTransactions } = useBlockExplorer(
    currentAddress,
    currentChain,
    currentPage,
    sortByAsc,
  );

  const handleAddressChange = (newAddress: string) => {
    if (isAddress(newAddress)) {
      setCurrentAddress(newAddress);
      router.push(`/wallet/${newAddress}?chain=${currentChain}`);
    }
  };

  const handleChainChange = (newChain: string) => {
    if (newChain !== currentChain) {
      setCurrentChain(newChain);
      setCurrentPage(1);
      router.push(`/wallet/${currentAddress}?chain=${newChain}`);
    }
  };

  const handlePageChange = (isForward: boolean) => {
    if (isForward && currentPage !== 10 && !lessThan10tx) {
      setCurrentPage(currentPage + 1);
    } else if (!isForward && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const validAddress = isAddress(params.address);

  const lessThan10tx = formattedTransactions.length < 10;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 lg:w-[50%] mx-auto h-auto ">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Title text="Wallet Transactions" />
        <Subtitle text="View up to a 100 most recent or oldest transactions for a wallet on ethereum and polygon" />
      </div>
      <div className="pt-10 hover:cursor-pointer">
        <PrimaryButton
          onClick={() => handleChainChange(isPolygon ? "ethereum" : "polygon")}
          isPolygon={isPolygon}
        >
          Switch to {isPolygon ? "ethereum" : "polygon"}
        </PrimaryButton>
      </div>
      <div className="w-full flex pt-8 text-neutral-200 justify-between items-center">
        <div className="flex-col gap-2 font-[100] normal-case tracking-wider text-sm">
          <div>
            Currently viewing data for&nbsp;
            <span
              className={
                currentChain === polygonString.toLowerCase()
                  ? "text-brand-purple"
                  : "text-brand-green"
              }
            >
              {currentChain === polygonString.toLowerCase()
                ? polygonString
                : ethereumString}
            </span>
          </div>
          <div>Wallet: {params.address}</div>
        </div>
        <UserBalance address={params.address} isPolygon={isPolygon} />
      </div>
      <div className="w-full pt-10 flex flex-col gap-2">
        <div className="text-neutral-200 uppercase text-xs">
          Search for another address
        </div>
        <div className="bg-neutral-50 items-center w-full flex gap-4 rounded-md px-2 py-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              className="rounded-lg px-4 py-1 w-full text-neutral-850 "
              placeholder="0xc1...ab42"
            />
          </div>
          <div className="flex-end w-auto">
            <PrimaryButton
              isPolygon={isPolygon}
              onClick={() => handleAddressChange(inputRef.current?.value ?? "")}
            >
              <span className="material-symbols-outlined">search</span>
            </PrimaryButton>
          </div>
        </div>
      </div>

      {validAddress ? (
        <>
          <div className="flex justify-between w-full text-neutral-200 pt-16">
            <div className="flex">
              <div className="flex gap-2">
                <div
                  className="hover:cusor-pointer"
                  onClick={() => handlePageChange(false)}
                >
                  {currentPage !== 1 && (
                    <span className="material-symbols-outlined hover:cursor-pointer">
                      chevron_left
                    </span>
                  )}
                </div>
                <div>{currentPage}</div>
                <div
                  className="hover:cusor-pointer"
                  onClick={() => handlePageChange(true)}
                >
                  {currentPage === 10 || lessThan10tx ? (
                    ``
                  ) : (
                    <span className="material-symbols-outlined hover:cursor-pointer">
                      chevron_right
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex font-[100] ">
              Sort by Date:&nbsp;
              <span
                className={`uppercase hover:cursor-pointer ${sortByAsc ? "font-normal" : ""}`}
                onClick={() => setSortByAsc(true)}
              >
                ASC
              </span>
              &nbsp;|&nbsp;
              <span
                className={`uppercase hover:cursor-pointer ${!sortByAsc ? "font-normal" : ""}`}
                onClick={() => setSortByAsc(false)}
              >
                DESC
              </span>
            </div>
          </div>

          <div className="w-full pt-2">
            {error ? (
              <p className="text-neutral-200">Error: {error}</p>
            ) : (
              <WalletTransactionsTable
                transactions={formattedTransactions}
                currentChain={currentChain}
                isLoading={isLoading}
              />
            )}
          </div>
        </>
      ) : (
        <div className="text-neutral-200 pt-2">
          <div className="text-sm uppercase">
            Not a valid EVM address, please try searching again.
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
