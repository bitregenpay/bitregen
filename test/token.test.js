const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BitReGenToken", function () {
  let token;
  let owner, presale, ecosystem, marketing, liquidity, team;
  let totalSupply;
  let vestingStart, vestingDuration;

  beforeEach(async function () {
    [owner, presale, ecosystem, marketing, liquidity, team] = await ethers.getSigners();

    totalSupply = ethers.parseUnits("100000000", 18); // 100M BRG
    const now = Math.floor(Date.now() / 1000);
    vestingStart = now + 86400; // 1 day from now
    vestingDuration = 86400 * 730; // 730 days

    const TokenFactory = await ethers.getContractFactory("BitReGenToken");
    token = await TokenFactory.deploy(
      totalSupply,
      presale.address,
      ecosystem.address,
      marketing.address,
      liquidity.address,
      team.address,
      vestingStart,
      vestingDuration
    );
  });

  describe("Deployment", function () {
    it("should deploy with correct name and symbol", async function () {
      expect(await token.name()).to.equal("BitReGen");
      expect(await token.symbol()).to.equal("BRG");
      expect(await token.decimals()).to.equal(18);
    });

    it("should have correct total supply", async function () {
      expect(await token.totalSupply()).to.equal(totalSupply);
      expect(await token.MAX_SUPPLY()).to.equal(totalSupply);
    });

    it("should set correct wallet addresses", async function () {
      expect(await token.presaleWallet()).to.equal(presale.address);
      expect(await token.ecosystemWallet()).to.equal(ecosystem.address);
      expect(await token.marketingWallet()).to.equal(marketing.address);
      expect(await token.liquidityWallet()).to.equal(liquidity.address);
    });
  });

  describe("Token Distribution", function () {
    it("should mint correct amounts to each wallet", async function () {
      const presaleAmount = totalSupply * 30n / 100n; // 30%
      const ecosystemAmount = totalSupply * 20n / 100n; // 20%
      const marketingAmount = totalSupply * 15n / 100n; // 15%
      const liquidityAmount = totalSupply * 15n / 100n; // 15%
      const teamAmount = totalSupply * 20n / 100n; // 20%

      expect(await token.balanceOf(presale.address)).to.equal(presaleAmount);
      expect(await token.balanceOf(ecosystem.address)).to.equal(ecosystemAmount);
      expect(await token.balanceOf(marketing.address)).to.equal(marketingAmount);
      expect(await token.balanceOf(liquidity.address)).to.equal(liquidityAmount);

      const vestingAddress = await token.teamVesting();
      expect(await token.balanceOf(vestingAddress)).to.equal(teamAmount);
    });

    it("should respect percentage allocation constants", async function () {
      expect(await token.PRESALE_PCT()).to.equal(30n);
      expect(await token.TEAM_PCT()).to.equal(20n);
      expect(await token.ECOSYS_PCT()).to.equal(20n);
      expect(await token.MKT_PCT()).to.equal(15n);
      expect(await token.LIQ_PCT()).to.equal(15n);
    });

    it("should sum up to 100% allocation", async function () {
      const totalPercentage = Number(await token.PRESALE_PCT()) + 
                             Number(await token.TEAM_PCT()) + 
                             Number(await token.ECOSYS_PCT()) + 
                             Number(await token.MKT_PCT()) + 
                             Number(await token.LIQ_PCT());
      expect(totalPercentage).to.equal(100);
    });
  });

  describe("Team Vesting", function () {
    it("should create vesting wallet with correct parameters", async function () {
      const vestingAddress = await token.teamVesting();
      expect(vestingAddress).to.not.equal(ethers.ZeroAddress);

      // Get vesting wallet contract
      const VestingWallet = await ethers.getContractFactory("VestingWallet");
      const vestingWallet = VestingWallet.attach(vestingAddress);

      expect(await vestingWallet.beneficiary()).to.equal(team.address);
      expect(await vestingWallet.start()).to.equal(vestingStart);
      expect(await vestingWallet.duration()).to.equal(vestingDuration);
    });

    it("should emit TeamVestingCreated event", async function () {
      const TokenFactory = await ethers.getContractFactory("BitReGenToken");
      
      const deployTx = await TokenFactory.deploy(
        totalSupply,
        presale.address,
        ecosystem.address,
        marketing.address,
        liquidity.address,
        team.address,
        vestingStart,
        vestingDuration
      );
      
      await expect(deployTx.deploymentTransaction()).to.emit(deployTx, "TeamVestingCreated");
    });
  });

  describe("Access Control", function () {
    it("should set deployer as owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Edge Cases", function () {
    it("should reject zero addresses in constructor", async function () {
      const TokenFactory = await ethers.getContractFactory("BitReGenToken");
      
      await expect(TokenFactory.deploy(
        totalSupply,
        ethers.ZeroAddress, // Invalid presale address
        ecosystem.address,
        marketing.address,
        liquidity.address,
        team.address,
        vestingStart,
        vestingDuration
      )).to.be.revertedWith("Zero address");
    });

    it("should reject zero supply", async function () {
      const TokenFactory = await ethers.getContractFactory("BitReGenToken");
      
      await expect(TokenFactory.deploy(
        0, // Invalid supply
        presale.address,
        ecosystem.address,
        marketing.address,
        liquidity.address,
        team.address,
        vestingStart,
        vestingDuration
      )).to.be.revertedWith("Supply > 0");
    });
  });

  describe("ERC20 Functionality", function () {
    it("should allow transfers from allocated wallets", async function () {
      const transferAmount = ethers.parseUnits("1000", 18);
      
      // Transfer from presale wallet to another address
      await token.connect(presale).transfer(owner.address, transferAmount);
      expect(await token.balanceOf(owner.address)).to.equal(transferAmount);
    });

    it("should allow approvals and transferFrom", async function () {
      const approvalAmount = ethers.parseUnits("5000", 18);
      const transferAmount = ethers.parseUnits("2000", 18);
      
      // Approve owner to spend from ecosystem wallet
      await token.connect(ecosystem).approve(owner.address, approvalAmount);
      expect(await token.allowance(ecosystem.address, owner.address)).to.equal(approvalAmount);
      
      // Transfer on behalf of ecosystem wallet
      await token.connect(owner).transferFrom(ecosystem.address, marketing.address, transferAmount);
      
      const expectedEcosystemBalance = totalSupply * 20n / 100n - transferAmount;
      const expectedMarketingBalance = totalSupply * 15n / 100n + transferAmount;
      
      expect(await token.balanceOf(ecosystem.address)).to.equal(expectedEcosystemBalance);
      expect(await token.balanceOf(marketing.address)).to.equal(expectedMarketingBalance);
    });
  });
});