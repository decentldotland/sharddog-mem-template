import { NextApiRequest, NextApiResponse } from "next";

import { uploadFileToArseedNode } from "@/helpers/arseed";
import { encryptEVMMessage } from "@/helpers/encryption";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { TXes } = req.body;
    if (!TXes) throw new Error("No TXes attached");
    const list = { files: TXes };
    const jsonStr = JSON.stringify(list, null, 2);
    const bufferFile = Buffer.from(jsonStr);
    const result = await uploadFileToArseedNode(bufferFile, "application/json");
    const itemId = result?.order?.itemId || "";
    const encryptedTX = await encryptEVMMessage(itemId);
    return res.status(200).json(encryptedTX);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
