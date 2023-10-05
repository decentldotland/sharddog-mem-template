export const contract_id = "mint.sharddog.near";
export const MEM_contract_id = "memtech-oracle-v0-1.near"; // "memtech.near";
export const functionId = "u-SCIA8l7ZKFiV-x9LFOvu9ZZXHoMyTI_xsGDQ47Jsc";
//"BQxGlCuCLNNPHPZ7HCpZqFHXktanq9kcN__5Nc8V_7s";
export const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const defaultWallet = "my-near-wallet";

export const adminMessage = "sharddog-admin-mem::";

export const ToastOptions = { duration: 3000 };

export const arseedURL = "https://arseed.web3infra.dev/";

export const MockMEMState = {
  evm_molecule_endpoint: "http://evm.molecule.sh",
  near_molecule_endpoint: "http://near.molecule.sh",
  near_oracle_address: "memtech-oracle-v0-1.near",
  admin_address: "0x29942a1ab52ea0A7c2c7C9DFE637710Cb460F61F",
  admin_counter: 0,
  containers: [],
  decryption_requests: [],
  decryption_hashes: [],
  admin_signatures: [],
  errors: [],
  publicFunctions: {
    createContainer: ["admin_sig", "nft_id", "content"],
    verifyDecrypt: ["id"],
  },
};

export const getFunctionCall = (
  methodName: string,
  args: any,
  deposit: string
) => ({
  actions: [
    {
      type: "FunctionCall",
      params: {
        methodName,
        args,
        gas: "30000000000000",
        deposit,
      },
    },
  ],
});

export const getReadFunction = (
  methodName: string,
  args: any,
  deposit: string
) => ({
  actions: [
    {
      type: "FunctionCall",
      params: {
        methodName,
        args,
        gas: "30000000000000",
        deposit,
      },
    },
  ],
});
