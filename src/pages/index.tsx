import React, { useEffect, useState } from "react";

import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { getAccounts } from "@/helpers/near";

import { MockMEMState } from "@/constants";
import { MEMState } from "@/types";
import { readMEM } from "@/helpers";

import CodeLinks from "@/components/codelinks";
import CodePreview from "@/components/codepreview";
import Guide from "@/components/guide";
import nearModal from "@/components/wrapper";
import { decryptEVMMessageWeb, sendAndEncrypt } from "@/helpers/encryption";
import { toast } from "react-hot-toast";

export default function Home() {
  // NEAR
  const [nearAccounts, setNearAccounts] = useState<any>();
  const [modal, setModal] = useState<WalletSelectorModal | undefined>();
  const [selector, setSelector] = useState<any>();

  // state and handlers
  const [state, setState] = useState<MEMState>();
  const [stateInit, setStateInit] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string | undefined>();
  const [textToEncrypt, setTextToEncrypt] = useState<string>("");
  const [textToDecrypt, setTextToDecrypt] = useState<string>("");
  const [TXes, setTXes] = useState<string[]>([]);

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

  //   async function handleJoinContainer() {
  //     // status cleanup and validation
  //     setStatusMessage(undefined);

  //     let user_signature = "";
  //     let admin_signature = "";

  //     // generate user signatures
  //     try {
  //       user_signature = await createSignature(
  //         `${userMessage}${state?.users_counter || 0}`
  //       );
  //       // request signature from our locally-stored private key
  //       admin_signature = await requestAdminSignature(
  //         `${adminMessage}${state?.admin_counter || 0}`
  //       );
  //     } catch (e) {
  //       toast.error("Signature generation failed", { duration: 3000 });
  //       return;
  //     }
  //     let token_address;
  //     let token_threshold = 0;

  //     // call the joinContainer helper function directly connected to MEM
  //     const newMEMState = await joinContainer(
  //       ethAddress,
  //       token_address,
  //       token_threshold,
  //       user_signature,
  //       admin_signature,
  //     );

  //     if (newMEMState) {
  //       setState(newMEMState);
  //       const { containers } = newMEMState;
  //       const lastContainer = containers[containers.length - 1];
  //       toast.success(
  //         `Container joined successfully! ID: ${lastContainer.id.substr(0, 8)}.`,
  //         { duration: 3000 }
  //       );
  //     } else {
  //       toast.error("Failed to join container.", { duration: 3000 });
  //     }
  //   }

  //   const handleUpdateAdmin = async (new_admin_address: string) => {
  //     if (!ethAddress) return;

  //     let admin_signature;
  //     try {
  //       admin_signature = await createSignature(
  //         `${adminMessage}${state?.users_counter || 0}`
  //       );
  //     } catch (e: any) {
  //       toast.error(e.message, { duration: 3000 });
  //       return;
  //     }

  //     const newMEMState = await updateAdmin(
  //       ethAddress,
  //       admin_signature,
  //       new_admin_address
  //     );

  //     if (newMEMState) {
  //       setState(newMEMState);
  //       const { admin_address } = newMEMState;
  //       toast.success(`Admin changed successfully! New admin: ${admin_address}`, {
  //         duration: 3000,
  //       });
  //     } else {
  //       toast.error("Failed to join container.", { duration: 3000 });
  //     }
  //   };

  async function encrypt() {
    const tx = await sendAndEncrypt(textToEncrypt);
    setTXes((txes) => [...txes, tx]);
  }

  async function decrypt() {
    const decryptedTX = await decryptEVMMessageWeb(textToDecrypt);
    const Comp = () => (
      <a
        href={`https://arseed.web3infra.dev/${decryptedTX}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        Check your content
      </a>
    );
    toast.success(<Comp />, { duration: 10000 });
  }

  useEffect(() => {
    const asyncFuncs = async () => {
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
      // init NEAR
      try {
        const { selector, modal } = await nearModal();
        setSelector(selector);
        setModal(modal);
        const accounts = (await getAccounts(selector, "near-wallet"))[0];
        setNearAccounts(accounts);
      } catch (e) {
        console.log(e);
      }
    };
    asyncFuncs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-y-6 min-h-screen p-24">
      <h1 className="text-black text-4xl font-bold text-center">
        Shard Dog Example Contract
      </h1>
      {nearAccounts && (
        <div className="mx-3">current account: {nearAccounts?.accountId}</div>
      )}
      <button
        className="border-2 border-black px-2 py-1"
        onClick={() => modal?.show()}
      >
        {nearAccounts ? "Open Modal" : "Connect Near"}
      </button>
      {TXes.map((tx) => (
        <div>{tx}</div>
      ))}
      <div className="flex items-center gap-x-2 ">
        <input
          className="border-black border-2 px-2 py-1"
          onChange={(e) => setTextToEncrypt(e.target.value)}
          value={textToEncrypt}
        />
        <button
          className="border-black border-2 px-2 py-1"
          onClick={() => encrypt()}
        >
          encrypt text
        </button>
      </div>
      <div className="flex items-center gap-x-2 ">
        <input
          className="border-black border-2 px-2 py-1"
          onChange={(e) => setTextToDecrypt(e.target.value)}
          value={textToDecrypt}
        />
        <button
          className="border-black border-2 px-2 py-1"
          onClick={() => decrypt()}
        >
          decrypt text
        </button>
      </div>
    </main>
  );
}
