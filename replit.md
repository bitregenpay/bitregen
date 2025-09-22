# BitReGen Token (BRG) - Blockchain Project

## Overview

BitReGen is a BEP-20 token built on the BNB Smart Chain using Solidity and the Hardhat development framework. The project implements a cryptocurrency token with a fixed supply of 100 million tokens, distributed across multiple allocations: 30% for presale, 20% for team (with vesting), 20% for ecosystem, 15% for marketing, and 15% for liquidity. The token leverages OpenZeppelin's battle-tested smart contract libraries for security and includes a sophisticated vesting mechanism for team tokens to ensure long-term commitment and prevent immediate sell-offs.

## Recent Changes

### September 22, 2025 - Complete Development Environment Setup
- **Established functional development environment** with Node.js 20, Hardhat 2.19.0, and OpenZeppelin Contracts 4.9.0 for stable BSC deployment
- **Deployed comprehensive smart contract**: BitReGenToken.sol with complete tokenomics implementation and team vesting mechanism
- **Created deployment infrastructure** with scripts for BSC testnet/mainnet deployment and automated verification commands
- **Established test suite** with 13 passing tests covering all contract functionality, token distribution, vesting mechanics, and edge cases
- **Configured automated compilation workflow** for continuous development and testing
- **Resolved critical compatibility issues** and validated production readiness through comprehensive review

### Current Project Status
- ✅ Smart contract compiled and tested successfully
- ✅ All 13 unit tests passing
- ✅ Ready for BSC testnet/mainnet deployment
- ✅ BSCScan verification commands configured
- ✅ Team vesting mechanism implemented and validated

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Smart Contract Architecture
The project uses a modular smart contract design built on OpenZeppelin's secure foundations. The main `BitReGenToken` contract inherits from `ERC20` for standard token functionality and `Ownable` for access control. A key architectural decision was to integrate OpenZeppelin's `VestingWallet` directly into the token contract, ensuring team tokens are automatically locked and released gradually over time. This approach provides transparency and security by making the vesting mechanism immutable and verifiable on-chain.

### Development Framework
The project is built using Hardhat, a comprehensive Ethereum development environment that provides compilation, testing, and deployment tools. Hardhat was chosen over alternatives like Truffle for its superior TypeScript support, better error messages, and more flexible plugin architecture. The configuration supports both BSC testnet and mainnet deployments with automatic contract verification through BSCScan API integration.

### Token Distribution Strategy
The token employs a fixed-supply model with no minting capabilities after deployment, ensuring predictable tokenomics. The distribution percentages are hardcoded as constants, preventing any manipulation post-deployment. The team allocation uses a cliff-and-vesting mechanism with a 6-month cliff period followed by linear vesting over 24 months, aligning team incentives with long-term project success.

### Network Configuration
The project is specifically configured for BNB Smart Chain deployment, supporting both testnet (chain ID 97) and mainnet (chain ID 56). This choice was made for lower transaction fees compared to Ethereum mainnet while maintaining EVM compatibility. The configuration includes gas optimization settings with the Solidity compiler optimizer enabled for 500 runs, balancing deployment cost with runtime efficiency.

### Testing Infrastructure
The project includes comprehensive unit tests using Hardhat's testing framework with Chai assertions. Tests cover critical functionality including proper token distribution, vesting wallet creation, and percentage calculations. The testing approach focuses on verifying tokenomics compliance and ensuring the immutable properties of the token contract.

## External Dependencies

### Blockchain Infrastructure
- **BNB Smart Chain**: Primary deployment target for mainnet and testnet
- **BSCScan API**: Contract verification and blockchain data services
- **Binance RPC Endpoints**: Blockchain connectivity for testnet and mainnet deployments

### Smart Contract Libraries
- **OpenZeppelin Contracts v4.9.0**: Core smart contract security primitives including ERC20, Ownable, and VestingWallet
- **Hardhat Framework v2.19.0**: Development environment and testing framework
- **Hardhat Toolbox**: Comprehensive plugin suite for compilation, testing, and verification

### Development Tools
- **Solidity v0.8.20**: Smart contract programming language with optimizer enabled
- **dotenv**: Environment variable management for sensitive deployment keys
- **Ethers.js**: Ethereum JavaScript library for contract interaction and deployment

### Future Integrations
- **PancakeSwap**: Planned DEX integration for liquidity provision
- **Team Finance/Unicrypt**: Liquidity token locking services
- **Multisig Wallets**: Enhanced security for treasury management
- **CoinGecko/CoinMarketCap**: Token listing and market data services