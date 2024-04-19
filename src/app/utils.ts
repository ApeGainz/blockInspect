export const getBlockExplorerUrl = (
  address: `0x${string}`,
  isPolygon: boolean,
  page: number,
  latestBlockNumber: number,
  sortByAsc: boolean,
): string => {
  const blockExplorerUrl = isPolygon
    ? `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=${latestBlockNumber}&page=${page}&offset=10&sort=${sortByAsc ? "asc" : "desc"}&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`
    : `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=${latestBlockNumber}&page=${page}&offset=10&sort=${sortByAsc ? "asc" : "desc"}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;

  return blockExplorerUrl;
};

export const shortenHash = (hash: string): string => {
  const shortenedString =
    hash.substring(0, 4) + "..." + hash.substring(hash.length - 4);
  return shortenedString;
};

export const ethereumString = "Ethereum";
export const polygonString = "Polygon";

export const hardcodedWallet = "0xd32b4524A1FBC8417ccDA8905561C4437Afbf858";

export const hardcodedEthereumTx =
  "0x1bb477dab1e9f629d9108d08e6c76a9490a3d7a1830d4920f8b450636f444457";
export const hardcodedPolygonTx =
  "0xd04e0c8799e6963954cb3d144fc0c91e398597c8893737b3c4dfde4eac5a7076";
