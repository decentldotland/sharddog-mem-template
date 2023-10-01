export const contract_id = "mint.sharddog.near";
export const functionId = "IsQ2GbvmQjdcuMV0XEo2onp-Cld3Yk9uMC8n0HMArs0";

export const defaultWallet = "my-near-wallet";

export const adminMessage = "sharddog-admin-mem::";

export const ToastOptions = { duration: 3000 };

export const arseedURL = "https://arseed.web3infra.dev/";

export const MockMEMState = {
  evm_molecule_endpoint: "http://evm.molecule.sh",
  admin_address: "0x29942a1ab52ea0A7c2c7C9DFE637710Cb460F61F",
  admin_counter: 0,
  containers: [],
  signatures: [],
  publicFunctions: {
    createContainer: ["admin_sig", "nft_id", "content"],
  },
};
