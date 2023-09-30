import axios from "axios";

export async function getWalletNFTs(
  user_address: string,
  collections: string[]
) {
  try {
    const request = await axios.post("/api/indexer", {
      user_address,
      collections,
    });
    return request.data.data;
  } catch (e) {
    console.log(e);
  }
}
