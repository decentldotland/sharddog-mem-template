import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { IndexerData } from "@/types/indexer";

const url = "https://api.indexer.xyz/graphql";

const query = `
query fetchCollectionInfo($collections: [String]!, $user_address: String!) {
  near {
    wallet_holdings_by_collection(address: $user_address, collections: $collections) {
      nft {
        name
        media_url
        token_id
      }
    }
  }
}
`;

const headers = {
  // TODO change to sharddog
  "x-api-user": "decent.land",
  "x-api-key": process.env.INDEXER_API_KEY,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { user_address, collections } = req.body;

    const variables = {
      collections,
      user_address,
    };
    console.log(variables);
    const request = await axios.post(url, { query, variables }, { headers });
    const indexerData = request.data as IndexerData;
    return res.status(200).json(indexerData);
  } catch (error: any) {
    console.log(error);
    return res.status(error.status || 500).end(error.message);
  }
}
