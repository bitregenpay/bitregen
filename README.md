
# BitReGen (BRG) - Sustainable Blockchain Payment Gateway

Welcome to the official repository of **BitReGen (BRG)**, a BEP-20 token on BNB Smart Chain focused on sustainable blockchain solutions and comprehensive payment gateway integration for businesses.

## 🔗 Quick Links

- 🌐 [Website](https://bitregenpay.com)
- 📄 [Whitepaper](docs/whitepaper.pdf)
- 🔐 [Contract Address](https://bscscan.com/token/0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad): `0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad`
- 🔍 [BSCScan](https://bscscan.com/token/0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad)
- 💱 [PancakeSwap](https://pancakeswap.finance/swap?outputCurrency=0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad)
- 📈 [DexScreener](https://dexscreener.com/bsc/0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad)

## 📋 Project Overview

BitReGen (BRG) is a sustainable blockchain token designed to power a comprehensive payment gateway ecosystem. Built on Binance Smart Chain, BRG combines:

- ✅ **Fixed Supply**: 100,000,000 BRG (no minting)
- ✅ **Team Vesting**: 2-year linear vesting for team tokens
- ✅ **Payment Gateway**: Advanced merchant payment processing
- ✅ **Multi-Wallet Distribution**: Fair token allocation
- ✅ **BSCScan Verified**: Transparent and auditable smart contracts

### Token Details

| Property | Value |
|----------|-------|
| **Name** | BitReGen |
| **Symbol** | BRG |
| **Total Supply** | 100,000,000 BRG |
| **Decimals** | 18 |
| **Network** | BNB Smart Chain (BEP-20) |
| **Contract** | [0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad](https://bscscan.com/token/0x33907a59cf1676FFDd4607ac2e7cF71be5A968ad) |

### Tokenomics

- 🎯 **30% Presale** - 30,000,000 BRG
- 👥 **20% Team** - 20,000,000 BRG (Vested over 2 years)
- 🌱 **20% Ecosystem** - 20,000,000 BRG
- 📢 **15% Marketing** - 15,000,000 BRG
- 💧 **15% Liquidity** - 15,000,000 BRG

## 🚀 Installation

### Prerequisites

- Node.js (version >= 14.x)
- npm or yarn
- Hardhat (for development)
- MetaMask or similar BSC wallet

### Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/bitregenpay/bitregen.git
cd bitregen
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
Create a `.env` file in the root directory:
```env
PRIVATE_KEY=your_wallet_private_key
BSCSCAN_API_KEY=your_bscscan_api_key
```

4. **Compile contracts:**
```bash
npm run compile
```

## 💻 Usage

### Deploy to BSC Testnet

```bash
npm run deploy:testnet
```

### Deploy to BSC Mainnet

```bash
npm run deploy:mainnet
```

### Run Tests

```bash
npm test
```

### Payment Gateway Integration

The BRG Payment Gateway allows merchants to accept BRG tokens as payment. See [docs/payment-gateway-roadmap.md](docs/payment-gateway-roadmap.md) for implementation details.

Example integration:
```javascript
const gateway = await BRGPaymentGateway.deploy(brgTokenAddress);
await gateway.createPayment(
  recipient,
  amount,
  orderId,
  description
);
```

## 📁 Project Structure

```
bitregen/
├── contracts/           # Solidity smart contracts
│   ├── BitReGenToken.sol
│   └── PaymentGateway.sol
├── scripts/            # Deployment and utility scripts
│   ├── deploy.js
│   ├── submit-coingecko.js
│   └── submit-coinmarketcap.js
├── test/               # Contract tests
├── website/            # Project website
├── docs/               # Documentation
└── hardhat.config.js   # Hardhat configuration
```

## 🔒 Security

- ✅ OpenZeppelin contracts for security best practices
- ✅ ReentrancyGuard protection on payment gateway
- ✅ Team tokens locked with linear vesting
- ✅ BSCScan verified contract
- ✅ No minting capability (fixed supply)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Community

- Website: [bitregenpay.com](https://bitregenpay.com)
- GitHub: [@bitregenpay](https://github.com/bitregenpay)

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always DYOR (Do Your Own Research) before investing in any cryptocurrency.

---

**Built with ❤️ on Binance Smart Chain**
