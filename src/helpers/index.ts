import axios from "axios";
import { toast } from "react-hot-toast";

import { ToastOptions, functionId } from "@/constants";
import { checkUserHoldings } from "./moralis";
import { Container, MEMState } from "../types/state";

export async function readMEM() {
  const request = await axios.get("/api/mem/read", {
    params: { functionId },
  });
  return request.data;
}

export async function writeMEM(input: Record<any, any>, suppressError = false) {
  try {
    const request = await axios.post("/api/mem/write", {
      functionId,
      inputs: [{ input }],
    });
    const { state, errors } = request.data;
    const errorCount = Object.keys(errors).length;
    if (!errorCount) return state as MEMState;
    else {
      let textErrors = "";
      Object.values(errors).map((error) => (textErrors += error + "\n"));
      throw new Error(textErrors);
    }
  } catch (e: any) {
    if (!suppressError) toast.error(e.message, ToastOptions);
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
  await writeMEM(payload, true);
  const request: MEMState | undefined = await writeMEM(payload);
  return request;
}

export function findByNFTId(
  state: MEMState,
  nftId: string
): Container | undefined {
  return state.containers.find((container) => container.nft_id === nftId);
}
