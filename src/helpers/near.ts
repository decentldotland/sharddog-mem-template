export async function getAccounts(selector: any, walletName: string) {
  const wallet = await selector.wallet(walletName);
  const accounts = await wallet.getAccounts();
  return accounts;
}

export async function connect(
  selector: any,
  walletName: string,
  contractId: string
) {
  const wallet = await selector.wallet(walletName);
  const accounts = await wallet.signIn({ contractId });
  return accounts;
}

export async function disconnect(selector: any, walletName: string) {
  const wallet = await selector.wallet(walletName);
  await wallet.signOut();
}

export async function accessWalletAPIs(selector: any, walletName: string) {
  const wallet = await selector.wallet(walletName);
  return wallet;
}
