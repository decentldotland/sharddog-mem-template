import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

export default async function nearModal(contract_id: string) {
  const selector = await setupWalletSelector({
    network: "mainnet",
    modules: [setupMyNearWallet()],
  });

  const modal = setupModal(selector, {
    contractId: contract_id,
    theme: "auto",
  });

  return { selector, modal };
}
