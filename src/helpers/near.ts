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
