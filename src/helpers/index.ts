import axios from "axios";
import { toast } from "react-hot-toast";

import { headers, ToastOptions, functionId } from "@/constants";
import { Container, MEMState } from "../types/state";

export async function readMEM() {
  const request = await axios.get("/api/mem/read", {
    params: { functionId },
  });
  return request.data;
}

export async function uploadToMEM(body: any) {
  const url = "https://api.mem.tech/api/transactions";
  //! temp fix
  await axios.post(url, body, headers);
  const request = (await axios.post(url, body, headers)).data;
  const state = request?.data?.execution?.state as MEMState;
  const errors = request?.data?.execution?.errors;
  return { state, errors };
}

export async function handleWriteMEM(
  input: Record<any, any>,
  suppressError = false
) {
  try {
    const payload = {
      functionId,
      inputs: [{ input: input }],
    };
    const { state, errors } = await uploadToMEM(payload);
    const errorCount = Object.keys(errors).length;
    if (!errorCount) return { state, errors };
    else {
      let textErrors = "";
      Object.values(errors).map((error) => (textErrors += error + "\n"));
      throw new Error(textErrors);
    }
  } catch (e: any) {
    if (!suppressError) toast.error(e.message, ToastOptions);
    console.log(e);
    return undefined;
  }
}

export async function createContainer(
  nft_id: string,
  content: string,
  admin_sig: string
) {
  const payload = {
    function: "createContainer",
    nft_id,
    content,
    admin_sig,
  };

  // ! This is a temp fix so that the interactions get to MEM
  await handleWriteMEM(payload, true);
  const request = await handleWriteMEM(payload);
  return request?.state;
}

export async function createContainerVercel(
  nft_id: string,
  content: string,
  admin_sig: string
) {
  const payload = {
    function: "createContainer",
    nft_id,
    content,
    admin_sig,
  };

  const response = (await axios.post("/api/create-container", payload)).data;
  return response;
}

export function findByNFTId(
  state: MEMState,
  nftId: string
): Container | undefined {
  return state.containers.find((container) => container.nft_id === nftId);
}

export async function verifyDecrypt(id: string) {
  try {
    const payload = {
      function: "verifyDecrypt",
      id,
    };
    const request = await handleWriteMEM(payload);
    return request;
  } catch (e) {
    console.log(e);
  }
}
