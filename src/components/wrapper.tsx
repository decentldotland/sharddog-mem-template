import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

export default async function nearModal() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [setupNearWallet()],
  });

  const modal = setupModal(selector, {
    contractId: "test.testnet",
    theme: "light",
  });

  return { selector, modal };
}
