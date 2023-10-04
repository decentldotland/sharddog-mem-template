import { NextApiRequest, NextApiResponse } from "next";

import { uploadToMEM } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { state, errors } = await uploadToMEM(req.body);
    return res.status(200).json({ state, errors });
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
