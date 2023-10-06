import { defaultWallet, functionId, getFunctionCall } from "@/constants";
import { NEAR_TX } from "@/types/state";

export const fetchWallet = async (selector: any, walletName: string) =>
  selector.wallet(walletName);

export const getAccounts = async (selector: any, walletName: string) =>
  (await fetchWallet(selector, walletName)).getAccounts();

export const connect = async (
  selector: any,
  walletName: string,
  contractId: string
) => (await fetchWallet(selector, walletName)).signIn({ contractId });

export const disconnect = async (selector: any, walletName: string) =>
  (await fetchWallet(selector, walletName)).signOut();

export const accessWalletAPIs = fetchWallet;

export const sendAndSignTransaction = async (
  selector: any,
  walletName: string,
  transaction: any
) =>
  (await fetchWallet(selector, walletName)).signAndSendTransaction(transaction);

export async function payAndSubmitTX(id: string, from: string, selector: any) {
  const TX = {
    id,
    from,
    functionId,
    inputs: JSON.stringify({ function: "decrypt" }),
    tags: "",
  } as NEAR_TX;
  const txSizeCost = BigInt(1e19) * BigInt(JSON.stringify(TX).length);
  const txData = getFunctionCall("commit", { TX }, txSizeCost.toString());
  await sendAndSignTransaction(selector, defaultWallet, txData);
}
