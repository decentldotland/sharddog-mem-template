import axios from "axios";

export async function checkUserHoldings(
  userAddress: string,
  tokenAddressesToCheck: string[]
) {
  try {
    return (
      await axios.post("/api/moralis", { userAddress, tokenAddressesToCheck })
    ).data?.result?.length;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
