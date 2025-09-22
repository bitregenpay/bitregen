const hre = require("hardhat");

async function main() {
  const totalSupply = hre.ethers.parseUnits("100000000", 18); // 100M BRG
  
  // ⚠️ Replace these placeholder addresses with your actual wallet addresses
  // Prefer multisig wallets for production deployments
  const PRESALE     = "0xPresaleWalletAddress";
  const ECOSYSTEM   = "0xEcosystemWalletAddress";
  const MARKETING   = "0xMarketingWalletAddress";
  const LIQUIDITY   = "0xLiquidityWalletAddress";
  const TEAM_BENEF  = "0xTeamMultisigAddress";

  const now = Math.floor(Date.now() / 1000);
  const VESTING_START = now + 60 * 60 * 24 * 180; // start in ~6 months (cliff), edit as you like
  const VESTING_DUR   = 60 * 60 * 24 * 730;       // ~24 months linear unlock

  console.log("Deploying BitReGen (BRG) token...");
  console.log("Total Supply:", hre.ethers.formatUnits(totalSupply, 18), "BRG");
  console.log("Presale Wallet:", PRESALE);
  console.log("Ecosystem Wallet:", ECOSYSTEM);
  console.log("Marketing Wallet:", MARKETING);
  console.log("Liquidity Wallet:", LIQUIDITY);
  console.log("Team Beneficiary:", TEAM_BENEF);
  console.log("Vesting Start:", new Date(VESTING_START * 1000));
  console.log("Vesting Duration:", VESTING_DUR / (60 * 60 * 24), "days");

  const Factory = await hre.ethers.getContractFactory("BitReGenToken");
  const token = await Factory.deploy(
    totalSupply,
    PRESALE,
    ECOSYSTEM,
    MARKETING,
    LIQUIDITY,
    TEAM_BENEF,
    VESTING_START,
    VESTING_DUR
  );
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  const vestingAddress = await token.teamVesting();

  console.log("\n🎉 Deployment successful!");
  console.log("BitReGen (BRG) deployed at:", tokenAddress);
  console.log("Team vesting wallet:", vestingAddress);
  
  // Display token distribution for verification
  console.log("\n📊 Token Distribution:");
  console.log("30% Presale:", hre.ethers.formatUnits(await token.balanceOf(PRESALE), 18), "BRG");
  console.log("20% Ecosystem:", hre.ethers.formatUnits(await token.balanceOf(ECOSYSTEM), 18), "BRG");
  console.log("15% Marketing:", hre.ethers.formatUnits(await token.balanceOf(MARKETING), 18), "BRG");
  console.log("15% Liquidity:", hre.ethers.formatUnits(await token.balanceOf(LIQUIDITY), 18), "BRG");
  console.log("20% Team (vesting):", hre.ethers.formatUnits(await token.balanceOf(vestingAddress), 18), "BRG");
  
  console.log("\n🔍 Next steps:");
  console.log("1. Verify on BSCScan using:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${tokenAddress} \\`);
  console.log(`     "${totalSupply}" \\`);
  console.log(`     "${PRESALE}" \\`);
  console.log(`     "${ECOSYSTEM}" \\`);
  console.log(`     "${MARKETING}" \\`);
  console.log(`     "${LIQUIDITY}" \\`);
  console.log(`     "${TEAM_BENEF}" \\`);
  console.log(`     ${VESTING_START} \\`);
  console.log(`     ${VESTING_DUR}`);
}

main().catch((e) => { 
  console.error(e); 
  process.exitCode = 1; 
});