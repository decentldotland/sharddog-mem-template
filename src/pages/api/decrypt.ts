import { decryptEVMMessageNode } from "@/helpers/encryption";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { hash } = req.body;
    if (!hash) throw new Error("No hash to decrypt!");
    const originalMessage = await decryptEVMMessageNode(hash);
    return res.status(200).json(originalMessage);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
