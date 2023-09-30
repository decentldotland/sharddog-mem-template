import axios from "axios";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

// used for ensuring the user request originates on our frontend
export async function requestAdminSignature(message: string) {
  try {
    const response = (await axios.post("/api/get-admin-sig", { message })).data;
    return response;
  } catch (e: any) {
    console.log(e.message);
    return undefined;
  }
}

export async function createNodeSignature(message: string) {
  const pk = ("0x" + process.env.ETH_PK) as `0x${string}`;
  if (!pk) return undefined;
  const account = privateKeyToAccount(pk);

  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  });

  const signature = await client.signMessage({
    account,
    message,
  });

  return signature;
}
