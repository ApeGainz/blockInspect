"use client";
import Title from "@/app/components/Title";
import Subtitle from "@/app/components/Subtitle";
import ExploreBox from "@/app/components/ExploreBox";
import { useState } from "react";
import PrimaryButton from "@/app/components/PrimaryButton";
import { ethereumString, polygonString } from "@/app/utils";

export default function Home() {
  const [isPolygon, setIsPolygon] = useState(false);

  return (
    <main className="bg-neutral-800 h-screen">
      <div className="flex flex-col items-center text-center justify-center py-16 gap-20">
        <div className="flex flex-col gap-2 ">
          <Title text="Block Inspect" />
          <Subtitle
            text={"Track transactions & wallets on Ethereum and Polygon"}
            className={"text-center text"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <PrimaryButton
            onClick={() => setIsPolygon(!isPolygon)}
            isPolygon={isPolygon}
          >
            Switch to {isPolygon ? ethereumString : polygonString}
          </PrimaryButton>
          <div className="w-full text-neutral-200 text-center tracking-widest uppercase text-[10px]">
            Currently on {isPolygon ? polygonString : ethereumString}
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-10 w-full px-10 justify-center">
          <div className="flex lg:w-[calc(50%-40px)] w-full items-center justify-center flex-shrink-0">
            <ExploreBox isPolygon={isPolygon} />
          </div>
          <div className="flex lg:w-[calc(50%-40px)] w-full items-center justify-center flex-shrink-0 ">
            <ExploreBox isTransaction={true} isPolygon={isPolygon} />
          </div>
        </div>
      </div>
    </main>
  );
}
