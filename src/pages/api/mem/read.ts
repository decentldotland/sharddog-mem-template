import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { functionId } = req.query;
    const url = `https://api.mem.tech/api/state/${functionId}`;
    const data = (await axios.get(url)).data;
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.status || 500).end(error.message);
  }
}
