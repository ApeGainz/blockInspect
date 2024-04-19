"use client";
import React, { useRef } from "react";
import Title from "@/app/components/Title";
import Subtitle from "@/app/components/Subtitle";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";
import {
  ethereumString,
  hardcodedEthereumTx,
  hardcodedPolygonTx,
  hardcodedWallet,
  polygonString,
} from "@/app/utils";

const ExploreBox: React.FC<{
  isPolygon?: boolean;
  isTransaction?: boolean;
}> = ({ isPolygon = false, isTransaction = false }) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const titleText = isTransaction ? "Transaction" : "Wallet";
  const subtitleText = isTransaction
    ? "Track transactions, read data and get a confirmation as soon as it completes"
    : "Get all transactions of a wallet with the ability to sort and filter it to suit your needs";

  const handleSearch = (hashToSearch: string) => {
    const searchUrl = isTransaction
      ? `/tx/${hashToSearch}?chain=${isPolygon ? polygonString.toLowerCase() : ethereumString.toLowerCase()}`
      : `/wallet/${hashToSearch}?chain=${isPolygon ? polygonString.toLowerCase() : ethereumString.toLowerCase()}`;

    router.push(searchUrl);
  };

  const handleRandomSearch = () => {
    const searchUrl = isTransaction
      ? `/tx/${isPolygon ? hardcodedPolygonTx : hardcodedEthereumTx}?chain=${isPolygon ? polygonString.toLowerCase() : ethereumString.toLowerCase()}`
      : `/wallet/${hardcodedWallet}?chain=${isPolygon ? polygonString.toLowerCase() : ethereumString.toLowerCase()}`;

    router.push(searchUrl);
  };

  return (
    <div className={`flex flex-col gap-y-4 w-full justify-center px-6`}>
      <div className={`flex flex-col gap-2 w-full justify-center`}>
        <Title text={titleText} small={true} className={"text-center"} />
        <div className={`h-10`}>
          <Subtitle
            text={subtitleText}
            className={"text-center"}
            small={true}
          />
        </div>
      </div>

      <div className="bg-neutral-50 items-center w-full flex gap-4 rounded-md px-2 py-2">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            className="rounded-lg px-4 py-1 w-full text-neutral-850 "
            placeholder="0x32...f858"
          />
        </div>
        <div className="flex-end w-auto">
          <PrimaryButton
            isPolygon={isPolygon}
            onClick={() => handleSearch(inputRef.current?.value ?? "")}
          >
            <span className="material-symbols-outlined">search</span>
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-1 w-full">
        <PrimaryButton isPolygon={isPolygon} onClick={handleRandomSearch}>
          {isTransaction ? "View sample tx" : "View sample wallet"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ExploreBox;
