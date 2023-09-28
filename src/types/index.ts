export enum GatingType {
  ERC20 = "erc20",
  ERC721 = "erc721",
}

export interface ContainerConfig {
  vault_id: string;
  gating_type: GatingType;
  token_address: string;
  max_entries: number;
  token_threshold: number;
}

export interface createContainerArgs extends ContainerConfig {}

export interface JoinContainerConfig {
  container_id?: string;
}

export type ContainerConfigKeys = keyof ContainerConfig;
export type JoinContainerConfigKeys = keyof JoinContainerConfig;

export interface Member {
  evm_address: string;
}

export interface Container {
  id: string;
  config: ContainerConfig;
  controller_address: string;
  // epoch time
  creation_timestamp: number;
  members: Member[];
}

export interface MEMState {
  evm_molecule_endpoint: string;
  admin_address: string;
  users_counter: number;
  admin_counter: number;
  containers: Container[];
  signatures: string[];
}

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
