import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";

import {
  MockMEMState,
  ToastOptions,
  contract_id,
  defaultWallet,
} from "@/constants";
import { findByNFTId, readMEM } from "@/helpers";
import { disconnect, getAccounts } from "@/helpers/near";
import { decryptEVMMessageWeb } from "@/helpers/encryption";
import { getWalletNFTs } from "@/helpers/indexer";
import { downloadAndDecrypt } from "@/helpers/arseed";

import { NFT } from "@/types/indexer";
import { MEMState } from "@/types/state";

import Guide from "@/components/guide";
import nearModal from "@/components/wrapper";
import Navbar from "@/components/navbar";
import FileLinks from "@/components/fileLinks";

export default function Home() {
  // NEAR
  const [nearAccounts, setNearAccounts] = useState<any>();
  const [modal, setModal] = useState<WalletSelectorModal | undefined>();
  const [selector, setSelector] = useState<any>();
  const [NFTs, setNFTs] = useState<NFT[]>([]);

  // state and handlers
  const [state, setState] = useState<MEMState>();
  const [stateInit, setStateInit] = useState<boolean>(true);

  async function reveal(tokenId: string) {
    if (!state) {
      toast.error(
        "Weird. How did this happen? Where is the contract state?",
        ToastOptions
      );
      return;
    }
    const nft = findByNFTId(state, tokenId);
    if (!nft) {
      toast.error("No goodies for this NFT yet!", ToastOptions);
      return;
    }
    const fileLinks = await downloadAndDecrypt(nft.content);
    if (!fileLinks) {
      toast.error("No goodies for this NFT yet!", ToastOptions);
      return;
    }
    updateNftFileLinks(tokenId, fileLinks.files);
    toast.success(
      "Decrypted " + fileLinks.files.length + " files for tokenId " + tokenId,
      ToastOptions
    );
  }

  function updateNftFileLinks(tokenId: string, fileLinks: string[]) {
    setNFTs((prevNfts) => {
      return prevNfts.map((nft) => {
        if (nft.nft.token_id === tokenId) {
          return {
            ...nft,
            fileLinks,
          };
        }
        return nft;
      });
    });
  }

  useEffect(() => {
    async function initNEAR() {
      try {
        const { selector, modal } = await nearModal(contract_id);
        setSelector(selector);
        setModal(modal);
        const accounts = (await getAccounts(selector, defaultWallet))[0];
        setNearAccounts(accounts);
        const indexer = await getWalletNFTs(accounts?.accountId, [contract_id]);
        const NFTs = indexer.near.wallet_holdings_by_collection;
        setNFTs(NFTs);
      } catch (e) {
        console.log(e);
      }
    }
    async function downloadState() {
      // read and set MEM state object
      let MEMState;
      try {
        MEMState = await readMEM();
        setState(MEMState);
        if (!MEMState) {
          setState(MockMEMState);
          setStateInit(false);
        } else setStateInit(true);
      } catch (e: any) {
        console.log(e.message);
      }
    }
    initNEAR();
    downloadState();
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
        <h2 className="text-2xl font-bold">Shard Dogs</h2>
        <div className="grid grid-cols-3 gap-x-4">
          {NFTs.map((NFT) => (
            <div className="flex flex-col gap-y-2 items-center justify-center max-w-[192px] text-center">
              <img src={NFT.nft.media_url} className="w-48 h-48" />
              <div className="">
                {NFT.nft.name} ({NFT.nft.token_id})
              </div>
              {NFT?.fileLinks?.length ? (
                <FileLinks fileLinks={NFT.fileLinks} />
              ) : (
                <button
                  onClick={() => reveal(NFT.nft.token_id)}
                  className="border px-2 py-1"
                >
                  Reveal Goodies
                </button>
              )}
            </div>
          ))}
        </div>
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
