import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { MockMEMState, ToastOptions, adminMessage } from "@/constants";
import { createContainer, readMEM } from "@/helpers";
import { uploadAndEncrypt, uploadFileWeb } from "@/helpers/arseed";
import { requestAdminSignature } from "@/helpers/signature";
import { MEMState } from "@/types/state";

import CodeLinks from "@/components/codelinks";
import CodePreview from "@/components/codepreview";
import Guide from "@/components/guide";
import nearModal from "@/components/wrapper";
import { decryptEVMMessageWeb } from "@/helpers/encryption";
import Navbar from "@/components/navbar";

export default function Home() {
  // Inputs
  const [nftId, setNftId] = useState<string>("");

  // state and handlers
  const [state, setState] = useState<MEMState>();
  const [stateInit, setStateInit] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);
  // const [lastHash, setLastHash] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  async function handleMEM(
    newMEMState: MEMState | any,
    successMessage: any,
    failureMessage: any
  ) {
    if (newMEMState) {
      setState(newMEMState);
      toast.success(successMessage, ToastOptions);
    } else {
      toast.error(failureMessage, ToastOptions);
    }
  }

  async function startUpload() {
    try {
      const requests = files.map(
        async (file) => (await uploadFileWeb(file)).data
      );
      const TXes = await Promise.all(requests);
      const hash = await uploadAndEncrypt(TXes);
      const adminSig = await requestAdminSignature(
        adminMessage + state?.admin_counter
      );
      const newMEMState = createContainer(nftId, hash, adminSig);
      toast.success("Upload successful!", ToastOptions);
      //   decrypt(hash);
    } catch (e) {
      console.log(e);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) return;
    const fileList = e.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setFiles(files);
  };

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
    };
    asyncFuncs();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center gap-y-6 min-h-screen p-24">
        <h1 className="text-4xl font-semibold text-center">Admin Management</h1>
        <Guide />
        <div className="flex items-center gap-x-2">
          <div className="relative inline-block">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute opacity-0 pointer-events-none"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="button px-2 py-1.5 cursor-pointer"
            >
              Choose a file
            </label>
          </div>
          <button className="border px-2 py-1" onClick={() => startUpload()}>
            Upload Files
          </button>
        </div>
        <div className="flex flex-col border-t-2 border-l-2 border-r-2 border-black dark:border-white">
          {files.map((file) => (
            <div className="border-b-2 border-black dark:border-white py-1 w-full px-2">
              {file.name}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
