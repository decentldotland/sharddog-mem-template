import { NextApiRequest, NextApiResponse } from "next";
import { createNodeSignature } from "@/helpers/signature";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!req.body.message) throw new Error("Add a message to sign!");
    const sig = await createNodeSignature(req.body.message);
    return res.status(200).json(sig);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
