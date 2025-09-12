export const CONTRACT_ADDRESSES = {

  // Test Tokens
  TEST_STK: "0x065369cE5998353C9b2B92983921B33DbB26AbDa",
  TEST_USDC: "0x2d7375EF43dE593DEFab68633470fCe947d64579",
  TEST_ETH: "0xD19a3F7535C5bDFb627fB52536F51679Ed5FD0dE",
  
  // Core Contracts
  LENDING_CONTRACT: "0x44644Ededc4f35d02141479e8202E0DA719695e4",
  COLLATERAL_CONTRACT: "0x1E967705de6B18F8FC0b15697C86Fbe6010bE581",
  TREASURY_CONTRACT: "0x3eDff67b31222FD8B4617A32cB0984C11574f75e",
  ETHEREUM_COLLATERAL_VERIFIER: "0xe45007fE3Ade114805A4F16463493BD4F07b7d4F",
  
  // Additional Contracts
  MOCK_ETHEREUM_NFT: "0x0caC4e3004c452134eD59Db4bcb63128d2140Ace",
  TOKEN_FAUCET: "0x924BC596391c95902626aEefC849314A2D75E3A7",
  UNISWAP_V3_ROUTER: "0x086d426f8b653b88a2d6d03051c8b4ab8783be2b"
};

export const DEMO_WALLETS = {
  AMINA: "0x742d35Cc6634C0532925a3b8D4e6D3b6e8d3e8A0",
  BRIAN: "0x8ba1f109551bD432803012645a136c82C3e8C9a",
  CHARITY: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed"
};

export const SOMNIA_MAINNET_CONFIG = {
  chainId: 50312,
  rpcUrl: 'https://dream-rpc.somnia.network',
  blockExplorer: 'https://shannon-explorer.somnia.network',
  nativeCurrency: {
    name: 'Somnia Token',
    symbol: 'STK',
    decimals: 18
  }
};

export const TOKEN_DECIMALS = {
  STK: 18,
  USDC: 6,
  ETH: 18
};

export const TOKEN_SYMBOLS = {
  TEST_STK: 'STK',
  TEST_USDC: 'USDC',
  TEST_ETH: 'ETH'
};

export const NETWORKS = {
  SomniaTestnet: {
    chainId: 50312,
    name: 'Somnia Mainnet',
    rpcUrl: 'https://dream-rpc.somnia.network',
    blockExplorer: 'https://shannon-explorer.somnia.network',
    nativeCurrency: {
      name: 'Somnia Token',
      symbol: 'STK',
      decimals: 18
    },
    testnet: false
  }
};

export const DEFAULT_NETWORK = NETWORKS.SomniaTestnet;
