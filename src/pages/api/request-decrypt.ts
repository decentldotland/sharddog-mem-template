import { NextApiRequest, NextApiResponse } from "next";

import { requestDecrypt } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const newState = await requestDecrypt(req.body.id);
    return res.status(200).json(newState);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
