import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

import { EvmChain } from "@moralisweb3/common-evm-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userAddress, tokenAddressesToCheck } = req.body;
    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }
    console.log(userAddress, tokenAddressesToCheck);
    const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: EvmChain.ETHEREUM,
      address: userAddress,
      tokenAddresses: tokenAddressesToCheck,
    });
    console.log(nftList);
    return res.status(200).json(nftList);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
