export interface Container {
  id: string;
  nft_id: string;
  content: string;
}

export interface MEMState {
  evm_molecule_endpoint: string;
  admin_address: string;
  admin_counter: number;
  containers: Container[];
  signatures: string[];
}
