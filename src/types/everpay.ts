export type SendAndPayInterface = (
  arseedingUrl: string,
  data: Buffer,
  tokenSymbol: string,
  opts: any,
  debug?: boolean
) => Promise<any>;

export interface EverpayTx {
  tokenSymbol: string;
  action: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  feeRecipient: string;
  nonce: number;
  tokenID: string;
  chainType: any;
  chainID: string;
  data: string;
  version: string;
  sig: string;
}

export interface EverpayTxAPIResponse extends EverpayTx {
  rawId: number;
  id: string;
  everHash: string;
  status: string;
  internalStatus: string;
  timestamp: number;
  targetChainTxHash: string;
  express: {
    chainTxHash: string;
    withdrawFee: string;
    refundEverHash: string;
    err: string;
  };
}

export interface Order {
  itemId: string;
  bundler: string;
  currency: string;
  decimals: number;
  fee: string;
  paymentExpiredTime: number;
  expectedBlock: number;
}

export interface EverPayResponse {
  status: string;
  everpayTx?: EverpayTx;
  everHash?: string;
  order?: Order;
}
