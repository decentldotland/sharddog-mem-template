export async function getAccounts(selector: any, walletName: string) {
  const wallet = await selector.wallet(walletName);
  const accounts = await wallet.getAccounts();
  return accounts;
}
