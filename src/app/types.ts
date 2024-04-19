export type FormattedTransaction = {
  txHash: string;
  timeStamp: number;
  amount: string;
  blockExplorer: string;
  blockNumber: string;
  confirmations: string;
};

export type TransactionDetail = {
  txHash: string;
  from: string;
  to: string;
  value: string;
  status: string;
  blockNumber?: number;
  blockExplorer: string;
};
