export interface Container {
  id: string;
  nft_id: string;
  content: string;
}

export interface MEMState {
  evm_molecule_endpoint: string;
  near_molecule_endpoint: string;
  near_oracle_address: string;
  admin_address: string;
  admin_counter: number;
  containers: Container[];
  decryption_hashes: string[];
  admin_signatures: string[];
  publicFunctions: Record<string, string[]>;
}

export interface NEAR_TX {
  id: string;
  from: string;
  functionId: string;
  inputs: string;
  tags?: string;
}
