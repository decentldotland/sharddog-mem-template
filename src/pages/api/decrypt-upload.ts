import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { arseedURL } from "@/constants";
import { decryptEVMMessageNode } from "@/helpers/encryption";
import { verifyDecrypt } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { contentHash, nearHash } = req.body;
    if (!contentHash || !nearHash) throw new Error("No hash to decrypt!");
    const newState = await verifyDecrypt(nearHash);
    if (
      newState?.state?.decryption_hashes?.find(
        (nearHash) => nearHash === nearHash
      )
    ) {
      throw new Error("Hash already decrypted!");
    }

    const decryptedTX = await decryptEVMMessageNode(contentHash);
    const fileHash = (await axios.get(arseedURL + decryptedTX)).data;
    const decryptedJson = JSON.parse(
      (await decryptEVMMessageNode(fileHash)) || ""
    );
    return res.status(200).json(decryptedJson);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
