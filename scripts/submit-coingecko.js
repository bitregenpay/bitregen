
// CoinGecko Submission Preparation Script
// Run this to generate all required information for CoinGecko listing

const tokenInfo = {
  name: "BitReGen",
  symbol: "BRG",
  contract_address: "0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad",
  blockchain: "BNB Smart Chain",
  total_supply: "100000000",
  decimals: 18,
  website: "https://your-repl-name.replit.app", // Update with your actual Repl URL
  description: "BitReGen is a sustainable blockchain token designed for payment gateway integration and ecosystem growth.",
  logo_url: "https://your-repl-name.replit.app/logo.svg", // Update with your actual Repl URL
  
  // Social Links (create these accounts)
  social_links: {
    twitter: "https://twitter.com/bitregentoken", // Create this
    telegram: "https://t.me/bitregentoken", // Create this
    discord: "https://discord.gg/bitregen", // Create this
    github: "https://github.com/your-username/bitregen" // Your GitHub repo
  },
  
  // Trading Information
  dex_info: {
    pancakeswap: "https://pancakeswap.finance/swap?outputCurrency=0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad",
    bscscan: "https://bscscan.com/token/0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad"
  }
};

console.log("📋 CoinGecko Submission Information:");
console.log("=====================================");
console.log(JSON.stringify(tokenInfo, null, 2));
console.log("\n🚀 Submit at: https://www.coingecko.com/en/coins/new");
console.log("\n📧 Email template for support:");
console.log(`
Subject: BitReGen (BRG) Token Listing Request

Dear CoinGecko Team,

I would like to submit BitReGen (BRG) for listing on CoinGecko.

Token Details:
- Name: BitReGen
- Symbol: BRG
- Contract: 0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad
- Blockchain: BNB Smart Chain
- Total Supply: 100,000,000 BRG
- Website: ${tokenInfo.website}
- Trading: Available on PancakeSwap

The token is fully verified on BSCScan and has active liquidity on PancakeSwap.

Best regards,
BitReGen Team
`);

module.exports = tokenInfo;
