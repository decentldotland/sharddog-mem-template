import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { arseedURL } from "@/constants";
import { decryptEVMMessageNode } from "@/helpers/encryption";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { hash } = req.body;
    if (!hash) throw new Error("No hash to decrypt!");
    const decryptedTX = await decryptEVMMessageNode(hash);
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
