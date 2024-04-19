import { useEffect, useState } from "react";
import axios from "axios";
import { getBlockExplorerUrl } from "@/app/utils";
import { FormattedTransaction } from "@/app/types";
import { useBlock } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { formatEther, isAddress } from "viem";

type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

type ApiResponse = {
  status: "0" | "1";
  message: string;
  result: Transaction[];
};

export const useBlockExplorer = (
  address: `0x${string}`,
  currentChain: string,
  page: number,
  sortByAsc: boolean,
) => {
  const isPolygon = currentChain === "polygon";

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formattedTransactions, setFormattedTransactions] = useState<
    FormattedTransaction[]
  >([]);
  const latestBlockEthereum = useBlock({
    chainId: mainnet.id,
  });

  const latestBlockPolygon = useBlock({
    chainId: polygon.id,
  });

  const [fetchedBlockNumberEthereum, setFetchedBlockNumberEthereumEthereum] =
    useState<number>(0);

  const [fetchedBlockNumberPolygon, setFetchedBlockNumberEthereumPolygon] =
    useState<number>(0);

  // fetch last block number for polygon and ethereum to use in api param
  useEffect(() => {
    if (latestBlockEthereum.data && fetchedBlockNumberEthereum === 0) {
      setFetchedBlockNumberEthereumEthereum(
        Number(latestBlockEthereum.data.number.toString()),
      );
    }
    if (latestBlockPolygon.data && fetchedBlockNumberPolygon === 0) {
      setFetchedBlockNumberEthereumPolygon(
        Number(latestBlockPolygon.data.number.toString()),
      );
    }
  }, [latestBlockEthereum.data, latestBlockPolygon.data]);

  useEffect(() => {
    // Ensures API call is only made when a valid block number is set, and it is a valid address
    if (fetchedBlockNumberEthereum > 0 && isAddress(address)) {
      const blockExplorerUrl = getBlockExplorerUrl(
        address,
        isPolygon,
        page,
        isPolygon ? fetchedBlockNumberPolygon : fetchedBlockNumberEthereum,
        sortByAsc,
      );

      const getTransactions = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get<ApiResponse>(blockExplorerUrl);
          if (data.result) {
            setApiData(data);
            const formattedData = data.result.map((tx) => ({
              txHash: tx.hash,
              timeStamp: parseInt(tx.timeStamp) * 1000,
              amount: formatEther(BigInt(tx.value)),
              blockExplorer: `https://${isPolygon ? "polygonscan.com" : "etherscan.io"}/tx/${tx.hash}`,
              blockNumber: tx.blockNumber,
              confirmations: tx.confirmations,
            }));
            setFormattedTransactions(formattedData);
          }
          setIsLoading(false);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred, please refresh the page");
          }
          setIsLoading(false);
        }
      };

      getTransactions();
    }
  }, [
    address,
    isPolygon,
    fetchedBlockNumberEthereum,
    fetchedBlockNumberPolygon,
    page,
    sortByAsc,
  ]);
  return {
    isLoading,
    apiData,
    error,
    formattedTransactions,
  };
};
