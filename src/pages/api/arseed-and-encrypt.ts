import { genNodeAPI } from "arseeding-js";
import { NextApiRequest, NextApiResponse } from "next";

import { EverPayResponse, SendAndPayInterface } from "../../types";
import { encryptEVMMessage } from "@/helpers/encryption";

export async function uploadFileToArseed(
  file: Buffer,
  dataType: string,
  debug = false
): Promise<EverPayResponse | null> {
  const fundingWalletPK = process.env.ETH_PK!;
  const currency = "AR";
  const instance = genNodeAPI(fundingWalletPK);
  const sendAndPay = instance.sendAndPay as SendAndPayInterface;

  const options = {
    tags: [{ name: "Content-Type", value: dataType }],
  };

  try {
    const result = await sendAndPay(
      "https://arseed.web3infra.dev",
      file,
      currency,
      options,
      false
    );
    if (debug) {
      console.log(result);
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { text } = req.body;
    if (!text) throw new Error("No info attached");
    const file = Buffer.from(text);
    const result = await uploadFileToArseed(file, "text/plain");
    const itemId = result?.order?.itemId || "";
    const encryptedTX = await encryptEVMMessage(itemId);
    console.log(encryptedTX);
    return res.status(200).json(encryptedTX);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
