import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";

import { contract_id, defaultWallet } from "@/constants";
import { disconnect, getAccounts } from "@/helpers/near";
import { decryptEVMMessageWeb } from "@/helpers/encryption";

import Guide from "@/components/guide";
import nearModal from "@/components/wrapper";
import Navbar from "@/components/navbar";
import { getWalletNFTs } from "@/helpers/indexer";
import { IndexerData, NFT } from "@/types/indexer";

export default function Home() {
  // NEAR
  const [nearAccounts, setNearAccounts] = useState<any>();
  const [modal, setModal] = useState<WalletSelectorModal | undefined>();
  const [selector, setSelector] = useState<any>();
  const [NFTs, setNFTs] = useState<NFT[]>([]);

  async function decrypt(hash: string) {
    const decryptedTX = await decryptEVMMessageWeb(hash);
    const Comp = () => (
      <>
        <div>Success!</div>{" "}
        <a
          href={`https://arseed.web3infra.dev/${decryptedTX}`}
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          Arseeding URL
        </a>
      </>
    );
    toast.success(<Comp />, { duration: 10000 });
  }

  useEffect(() => {
    const initNEAR = async () => {
      try {
        const { selector, modal } = await nearModal(contract_id);
        setSelector(selector);
        setModal(modal);
        const accounts = (await getAccounts(selector, defaultWallet))[0];
        setNearAccounts(accounts);
        const indexer = await getWalletNFTs(accounts?.accountId, [contract_id]);
        const { wallet_holdings_by_collection } = indexer.near;
        const NFTs = wallet_holdings_by_collection;
        setNFTs(NFTs);
      } catch (e) {
        console.log(e);
      }
    };
    initNEAR();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-y-6 min-h-screen p-24">
        <h1 className="text-4xl font-bold text-center">
          Shard Dog Example Contract (User Side)
        </h1>
        <div className="flex items-center gap-x-2">
          <button className="border px-2 py-1" onClick={() => modal?.show()}>
            {nearAccounts ? nearAccounts?.accountId : "Connect Near"}
          </button>
          {nearAccounts && (
            <button
              className="border px-2 py-1"
              onClick={async () => {
                await disconnect(selector, defaultWallet);
                setNearAccounts(undefined);
              }}
            >
              Disconnect
            </button>
          )}
        </div>
        {NFTs.map((NFT) => (
          <div className="flex flex-col items-center justify-center">
            <img src={NFT.nft.media_url} className="w-40 h-40" />
          </div>
        ))}
      </main>
    </>
  );
}

// async function handleMEM(
//   newMEMState: MEMState | any,
//   successMessage: any,
//   failureMessage: any
// ) {
//   if (newMEMState) {
//     setState(newMEMState);
//     toast.success(successMessage, ToastOptions);
//   } else {
//     toast.error(failureMessage, ToastOptions);
//   }
// }

// <div className="flex items-center gap-x-2 ">
// <input
//   className="border-black border-2 px-2 py-1"
//   onChange={(e) => setTextToEncrypt(e.target.value)}
//   value={textToEncrypt}
// />
// <button
//   className="border-black border-2 px-2 py-1"
//   onClick={() => encrypt()}
// >
//   encrypt text
// </button>
// </div>
// <div className="flex items-center gap-x-2 ">
// <input
//   className="border-black border-2 px-2 py-1"
//   onChange={(e) => setTextToDecrypt(e.target.value)}
//   value={textToDecrypt}
// />
// <button
//   className="border-black border-2 px-2 py-1"
//   onClick={() => decrypt()}
// >
//   decrypt text
// </button>
// </div>

// async function decrypt() {
//   const decryptedTX = await decryptEVMMessageWeb(textToDecrypt);
//   const Comp = () => (
//     <a
//       href={`https://arseed.web3infra.dev/${decryptedTX}`}
//       className="underline"
//       target="_blank"
//       rel="noreferrer noopener"
//     >
//       Arseeding URL
//     </a>
//   );
//   toast.success(<Comp />, { duration: 10000 });
// }

//   async function handleCreateContainer(config: ContainerConfig) {
//     setStatusMessage(undefined);

//     let user_signature = "";
//     let admin_signature = "";

//     // generate user signatures
//     try {
//       admin_signature = await requestAdminSignature(
//         `${adminMessage}${state?.admin_counter || 0}`
//       );
//     } catch (e) {
//       toast.error("Signature generation failed", { duration: 3000 });
//       return;
//     }

//     // call the createContainer helper function directly connected to MEM
//     const newMEMState = await createContainer(
//       "",
//       config,
//       user_signature,
//       admin_signature
//     );

//     if (newMEMState) {
//       setState(newMEMState);
//       const { containers } = newMEMState;
//       const lastContainer = containers[containers.length - 1];
//       toast.success(
//         `Container ${lastContainer.id.substr(0, 8)}... created successfully!`,
//         { duration: 3000 }
//       );
//     } else {
//       toast.error("Failed to create container.", { duration: 3000 });
//     }
//   }
