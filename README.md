# SomniaLend - Decentralized Micro-Lending Platform

## Overview

SomniaLend is a comprehensive decentralized finance (DeFi) micro-lending platform built on the Somnia network, designed to provide accessible financial services for underserved communities. The platform combines traditional lending functionality with advanced DeFi features including cross-chain NFT collateral, automated market making via Uniswap V3, and yield farming through treasury deposits.

## 🎯 Mission & Vision

**Mission**: Democratize access to financial services by providing a seamless, secure, and user-friendly micro-lending platform that bridges traditional finance with decentralized technologies.

**Vision**: Create a world where anyone, regardless of their geographic location or economic status, can access fair and transparent financial services through blockchain technology.

## 🏗️ Architecture Overview

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Next.js   │  │  TypeScript │  │  Tailwind   │        │
│  │   React     │  │   Web3.js   │  │    CSS      │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Blockchain Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Somnia     │  │  Uniswap    │  │  Chainlink  │        │
│  │  Network    │  │    V3       │  │    CCIP     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Smart Contract Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Lending   │  │ Collateral  │  │  Treasury   │        │
│  │  Contract   │  │  Contract   │  │  Contract   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Core Features

#### 1. **Micro-Lending System**
- **Loan Request**: Users can request micro-loans with customizable terms
- **Dynamic Interest Rates**: Algorithmic interest calculation based on market conditions
- **Flexible Repayment**: Multiple repayment options with early repayment bonuses
- **Credit Scoring**: On-chain credit history tracking for better rates

#### 2. **Cross-Chain NFT Collateral**
- **Multi-Chain Support**: Accept NFTs from Ethereum, Polygon, and other EVM chains
- **Chainlink CCIP Integration**: Secure cross-chain asset verification and transfer
- **Automated Liquidation**: Smart liquidation triggers based on collateral value
- **NFT Valuation**: Real-time pricing using Chainlink price feeds

#### 3. **Automated Market Making**
- **Uniswap V3 Integration**: Direct token swaps within the platform
- **Concentrated Liquidity**: Efficient capital utilization for better rates
- **Multi-Token Support**: Support for major tokens and stablecoins
- **Slippage Protection**: Advanced routing to minimize price impact

#### 4. **Yield Farming & Treasury**
- **FeeM Rewards**: Earn protocol fees by depositing to treasury
- **Auto-Compounding**: Automatic reward reinvestment
- **Risk-Adjusted Returns**: Dynamic APY based on pool utilization
- **Instant Withdrawals**: No lock-up periods for treasury deposits

### Technical Features

#### Frontend
- **Progressive Web App**: Installable on mobile devices
- **Responsive Design**: Optimized for mobile and desktop
- **Real-time Updates**: Live transaction status and balance updates
- **Dark/Light Mode**: User preference support
- **Multi-language Support**: Internationalization ready

#### Security
- **Smart Contract Audits**: Comprehensive security reviews
- **Bug Bounty Program**: Community-driven security testing
- **Emergency Pause**: Circuit breaker mechanisms
- **Rate Limiting**: Protection against spam and attacks

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context + SWR
- **Web3**: Web3.js + Ethers.js
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Smart Contracts
- **Language**: Solidity 0.8.x
- **Framework**: Foundry
- **Testing**: Forge test with 90%+ coverage
- **Gas Optimization**: EIP-1559 compatible with gas estimation
- **Upgradability**: Proxy pattern for future updates

### Infrastructure
- **Network**: Somnia Shannon (mainnet ready)
- **RPC**: Public RPC endpoints with fallback
- **IPFS**: Decentralized storage for metadata
- **The Graph**: Subgraph for indexed data
- **Chainlink**: Price feeds and CCIP

## 📁 Project Structure

```
SomniaLend/
├── Contracts/
│   ├── src/
│   │   ├── Lending.sol          # Core lending logic
│   │   ├── Collateral.sol       # NFT collateral management
│   │   ├── Treasury.sol         # Yield farming contract
│   │   ├── interfaces/          # Contract interfaces
│   │   └── libraries/           # Helper libraries
│   ├── test/                    # Foundry test files
│   ├── script/                  # Deployment scripts
│   └── foundry.toml            # Foundry configuration
├── Frontend/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API and blockchain services
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration files
│   │   └── landingPage/        # Marketing website
│   ├── public/                 # Static assets
│   └── package.json
├── README.md
└── .gitignore
```

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: Latest version
- **MetaMask**: Browser extension or mobile app
- **Foundry**: For smart contract development

### Environment Setup

1. **Clone the repository**:
```bash
git clone https://github.com/your-org/SomniaLend.git
cd SomniaLend
```

2. **Install dependencies**:
```bash
# Frontend dependencies
cd Frontend
npm install

# Smart contract dependencies
cd ../Contracts
forge install
```

3. **Environment variables**:
Create `.env.local` in the Frontend directory:
```bash
NEXT_PUBLIC_RPC_URL=https://dream-rpc.somnia.network
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_LENDING_CONTRACT=0x44644Ededc4f35d02141479e8202E0DA719695e4
NEXT_PUBLIC_COLLATERAL_CONTRACT=0x1E967705de6B18F8FC0b15697C86Fbe6010bE581
NEXT_PUBLIC_TREASURY_CONTRACT=0x3eDff67b31222FD8B4617A32cB0984C11574f75e
NEXT_PUBLIC_UNISWAP_ROUTER=0x086d426f8b653b88a2d6d03051c8b4ab8783be2b
```

### Smart Contract Development

1. **Compile contracts**:
```bash
cd Contracts
forge build
```

2. **Run tests**:
```bash
forge test
```

3. **Deploy to testnet**:
```bash
forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### Frontend Development

1. **Start development server**:
```bash
cd Frontend
npm run dev
```

2. **Build for production**:
```bash
npm run build
```

3. **Run tests**:
```bash
npm test
```

## 🔗 Contract Addresses

### Somnia Mainnet
| Contract | Address |
|----------|---------|
| LendingContractNFT | `0x2b9D6f696a08eD6cc5a9CCb7Ad77834837B5471e` |
| CollateralContract | `0x65489A31e4cCe579cC0d8c9eE3Be06DdE8A976D4` |
| TreasuryContract | `0x9cE953786c7fEeC5896cBD4ae37af93d737fcaA4` |
| EthereumCollateralVerifier | `0x5dB3a10D28610520274528d0aBC6298eF930cF8E` |
| Uniswap V3 Router | `0x086d426f8b653b88a2d6d03051c8b4ab8783be2b` |

## 📊 API Documentation

### Smart Contract Methods

#### Lending Contract
```solidity
// Request a loan
function requestLoan(
    uint256 amount,
    uint256 duration,
    address collateralToken,
    uint256 collateralAmount
) external returns (uint256 loanId);

// Repay a loan
function repayLoan(uint256 loanId) external;

// Get loan details
function getLoan(uint256 loanId) external view returns (Loan memory);
```

#### Collateral Contract
```solidity
// Lock NFT as collateral
function lockCollateral(
    address nftContract,
    uint256 tokenId,
    uint256 loanId
) external;

// Unlock collateral
function unlockCollateral(uint256 loanId) external;
```

#### Treasury Contract
```solidity
// Deposit to treasury
function deposit(uint256 amount) external;

// Withdraw from treasury
function withdraw(uint256 amount) external;

// Get user balance
function getUserBalance(address user) external view returns (uint256);
```

### Frontend API

#### Wallet Context
```typescript
// Connect wallet
const { connect } = useWallet();

// Get balance
const { getBalance } = useWallet();

// Send transaction
const { sendTransaction } = useWallet();
```

#### Loan Hooks
```typescript
// Request loan
const { requestLoan } = useLoan();

// Repay loan
const { repayLoan } = useLoan();

// Get loan history
const { getLoanHistory } = useLoan();
```

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
forge test

# Run with coverage
forge coverage

# Run specific test
forge test --match-test testRequestLoan
```

### Frontend Tests
```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🔐 Security

### Smart Contract Security
- **Reentrancy Protection**: All external calls use reentrancy guards
- **Access Control**: Role-based access control for admin functions
- **Input Validation**: Comprehensive input validation for all functions
- **Gas Optimization**: Efficient gas usage patterns
- **Overflow Protection**: SafeMath library usage

### Frontend Security
- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: All communications encrypted
- **Input Sanitization**: XSS protection
- **Rate Limiting**: API rate limiting
- **Wallet Security**: Secure key management

## 📈 Performance

### Optimization Strategies
- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Aggressive caching strategies
- **Image Optimization**: WebP format with fallbacks
- **CDN**: Global content delivery

### Monitoring
- **Analytics**: User behavior tracking
- **Error Tracking**: Sentry integration
- **Performance**: Web Vitals monitoring
- **Uptime**: Status page monitoring

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **Solidity**: Follow Solidity style guide
- **TypeScript**: Use TypeScript strict mode
- **Testing**: Maintain 90%+ test coverage
- **Documentation**: Document all public functions

## 🗺️ Roadmap

### Q1 2024
- [x] Smart contract deployment
- [x] Frontend MVP
- [x] Basic lending functionality
- [x] Wallet integration

### Q2 2024
- [ ] Cross-chain NFT collateral
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Governance token

### Q3 2024
- [ ] Multi-chain support
- [ ] Advanced risk management
- [ ] Institutional features
- [ ] Insurance integration

### Q4 2024
- [ ] Mainnet launch
- [ ] DAO governance
- [ ] Ecosystem grants
- [ ] Global expansion

## 📞 Support

### Community
- **Discord**: [Join our Discord](https://discord.gg/SomniaLend)
- **Twitter**: [@SomniaLendDeFi](https://twitter.com/SomniaLendDeFi)
- **Telegram**: [SomniaLend Community](https://t.me/SomniaLend_community)

### Technical Support
- **Documentation**: [docs.SomniaLend.finance](https://docs.SomniaLend.finance)
- **GitHub Issues**: [Report bugs here](https://github.com/your-org/SomniaLend/issues)
- **Email**: support@SomniaLend.finance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Somnia Shannon**: For providing the high-performance blockchain infrastructure
- **Chainlink**: For secure oracle services and CCIP
- **Uniswap**: For the V3 AMM integration
- **Foundry**: For the excellent smart contract development framework
- **Community**: All our amazing contributors and users

---

**Built with ❤️ by the SomniaLend Team**
