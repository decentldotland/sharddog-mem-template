import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const url = "https://api.mem.tech/api/transactions";
    const request = (await axios.post(url, req.body, headers)).data;
    const state = request?.data?.execution?.state;
    const errors = request?.data?.execution?.errors;
    console.log(request.data);
    return res.status(200).json({ state, errors });
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
