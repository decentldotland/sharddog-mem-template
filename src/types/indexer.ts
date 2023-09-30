export interface IndexerData {
  near: Near;
}

export interface Near {
  wallet_holdings_by_collection: NFT[];
}

export interface NFT {
  nft: {
    name: string;
    media_url: string;
    token_id: string;
  };
}
