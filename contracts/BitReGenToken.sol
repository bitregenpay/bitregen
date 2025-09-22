// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * BitReGen (BRG) – BEP-20 on BNB Chain
 * Tokenomics:
 *  - 30% Presale
 *  - 20% Team (locked via VestingWallet)
 *  - 20% Ecosystem
 *  - 15% Marketing
 *  - 15% Liquidity
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract BitReGenToken is ERC20, Ownable {
    // Percentages
    uint256 public constant PRESALE_PCT = 30;
    uint256 public constant TEAM_PCT    = 20;
    uint256 public constant ECOSYS_PCT  = 20;
    uint256 public constant MKT_PCT     = 15;
    uint256 public constant LIQ_PCT     = 15;

    // Supply
    uint256 public immutable MAX_SUPPLY;

    // Wallets
    address public immutable presaleWallet;
    address public immutable ecosystemWallet;
    address public immutable marketingWallet;
    address public immutable liquidityWallet;

    // Team vesting
    VestingWallet public teamVesting;

    event TeamVestingCreated(address vesting, address beneficiary, uint64 start, uint64 duration);

    constructor(
        uint256 _maxSupply,                // e.g. 100_000_000 * 1e18
        address _presaleWallet,
        address _ecosystemWallet,
        address _marketingWallet,
        address _liquidityWallet,
        address _teamBeneficiary,          // team multisig (beneficiary)
        uint64  _vestingStartTimestamp,    // UNIX seconds (can set in future for cliff)
        uint64  _vestingDurationSeconds    // e.g. 730 days (~24 months)
    )
        ERC20("BitReGen", "BRG")
    {
        _transferOwnership(msg.sender);
        require(_maxSupply > 0, "Supply > 0");
        require(
            _presaleWallet != address(0) &&
            _ecosystemWallet != address(0) &&
            _marketingWallet != address(0) &&
            _liquidityWallet != address(0) &&
            _teamBeneficiary != address(0),
            "Zero address"
        );

        MAX_SUPPLY = _maxSupply;

        presaleWallet   = _presaleWallet;
        ecosystemWallet = _ecosystemWallet;
        marketingWallet = _marketingWallet;
        liquidityWallet = _liquidityWallet;

        // Calculate buckets
        uint256 presaleAmt = (_maxSupply * PRESALE_PCT) / 100;
        uint256 teamAmt    = (_maxSupply * TEAM_PCT)    / 100;
        uint256 ecosysAmt  = (_maxSupply * ECOSYS_PCT)  / 100;
        uint256 mktAmt     = (_maxSupply * MKT_PCT)     / 100;
        uint256 liqAmt     = (_maxSupply * LIQ_PCT)     / 100;

        // Mint to wallets
        _mint(presaleWallet, presaleAmt);
        _mint(ecosystemWallet, ecosysAmt);
        _mint(marketingWallet, mktAmt);
        _mint(liquidityWallet, liqAmt);

        // Create vesting wallet for Team and mint there
        teamVesting = new VestingWallet(
            _teamBeneficiary,
            _vestingStartTimestamp,
            _vestingDurationSeconds
        );
        emit TeamVestingCreated(address(teamVesting), _teamBeneficiary, _vestingStartTimestamp, _vestingDurationSeconds);

        _mint(address(teamVesting), teamAmt);

        require(totalSupply() == MAX_SUPPLY, "Mint mismatch");
    }
}