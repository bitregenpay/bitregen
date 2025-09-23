require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY, BSCSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: { 
      optimizer: { 
        enabled: true, 
        runs: 500 
      } 
    }
  },
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    // V2 API format - single API key
    apiKey: BSCSCAN_API_KEY || "MFM3MHUQXKVD5WB97T62Q8P2G1TJQTR8A8",
    customChains: [
      {
        network: "bscMainnet",
        chainId: 56,
        urls: { apiURL: "https://api.bscscan.com/api", browserURL: "https://bscscan.com" }
      },
      {
        network: "bscTestnet",
        chainId: 97,
        urls: { apiURL: "https://api-testnet.bscscan.com/api", browserURL: "https://testnet.bscscan.com" }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};