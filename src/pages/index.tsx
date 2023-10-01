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
import { getWalletNFTs } from "@/helpers/indexer";
import { downloadAndDecrypt } from "@/helpers/arseed";

import { NFT } from "@/types/indexer";
import { MEMState } from "@/types/state";

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
        if (!accounts) return;
        const indexer = await getWalletNFTs(accounts?.accountId, [contract_id]);
        const NFTs = indexer.near.wallet_holdings_by_collection;
        setNFTs(NFTs);
        // const wallet = await accesso(selector, defaultWallet);
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
