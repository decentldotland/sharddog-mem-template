import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { MockMEMState, ToastOptions, adminMessage } from "@/constants";
import { createContainer, readMEM } from "@/helpers";
import { uploadAndEncrypt, uploadFileWeb } from "@/helpers/arseed";
import { requestAdminSignature } from "@/helpers/signature";
import { MEMState } from "@/types/state";

import CodePreview from "@/components/codepreview";
import Navbar from "@/components/navbar";
import Guide from "@/components/guide";

export default function Home() {
  // Inputs
  const [tokenId, setTokenId] = useState<string>("");

  // state and handlers
  const [state, setState] = useState<MEMState>();
  const [stateInit, setStateInit] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);

  async function startUpload() {
    try {
      const loading1 = toast.loading("Uploading Files...");
      // each file gets uploaded to arseed while returning an arweave TX
      const requests = files.map(
        async (file) => (await uploadFileWeb(file)).data
      );
      const TXes = await Promise.all(requests);
      toast.dismiss(loading1);
      const loading2 = toast.loading("Saving to MEM...");
      // upload all TXes as a JSON and hash them
      const hash = await uploadAndEncrypt(TXes);
      const adminSignature = await requestAdminSignature(
        adminMessage + state?.admin_counter
      );
      const newMEMState = await createContainer(
        tokenId.trim(),
        hash,
        adminSignature
      );
      console.log(newMEMState);
      if (newMEMState) {
        setState(newMEMState);
        toast.dismiss(loading2);
        toast.success(`Token #${tokenId} Successfully Created`, ToastOptions);
        return true;
      } else {
        toast.error("", ToastOptions);
        return false;
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message, ToastOptions);
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
        <CodePreview state={state} isMockup={false} />
        <h2 className="text-2xl">Step 1: Add Token Id</h2>
        <div className="flex">
          <div className="flex-col">
            <div className=""></div>
            <input
              className="border px-2 py-1 dark:bg-black placeholder:dark:text-gray-700"
              placeholder="242:15..."
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
        </div>
        <h3 className="text-2xl">Step 2: Attach Files</h3>
        {!!files.length && (
          <>
            <p className="text-2xl">File List</p>
            <div className="flex flex-col border-t-2 border-l-2 border-r-2 border-black dark:border-white">
              {files.map((file, key) => (
                <div
                  {...{ key }}
                  className="border-b-2 border-black dark:border-white py-1 w-full px-2"
                >
                  {file.name}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex items-center gap-x-2">
          <div className="relative inline-block">
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              className="absolute opacity-0 pointer-events-none"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="border px-2 py-1.5 cursor-pointer"
            >
              Choose files
            </label>
          </div>
          <button className="border px-2 py-1" onClick={() => startUpload()}>
            Upload Files To MEM
          </button>
        </div>
      </main>
    </>
  );
}
