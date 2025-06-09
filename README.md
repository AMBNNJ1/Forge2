# Forge 

**Forge** is a multi-chain, no-code token launch platform that enables users to deploy tokens across Solana, Base, Avalanche, and other EVM-compatible chains in under 60 seconds. The platform features customizable tokenomics, automated liquidity locking, real-time analytics, and optional social distribution tools like Tweet-to-Mint. 

## 🔧 Features

- **Multi-Chain Token Deployment**  
  Launch tokens on Solana, Base, Avalanche (and more soon) via simple UI.

- **No-Code Launch Wizard**  
  Configure name, symbol, supply, chain, and mechanics without writing any code.

- **Tokenomics Configuration**  
  Set burn percentages, transaction taxes, LP lock durations, and presale options.

- **Tweet-to-Mint Integration**  
  Verify tweet ownership and reward engaged users with automated airdrops.

- **Liquidity Protection**  
  Enforce automatic liquidity locks and unlock timers to prevent rug pulls.

- **Live Launch Dashboard**  
  Track launched tokens by market cap, holders, burn logs, and chain activity.

---

## 🏗 Tech Stack

| Layer         | Tech                                  |
|--------------|----------------------------------------|
| Frontend      | React + Tailwind (OpenAI design system) |
| Backend       | Next.js / Express                     | 
| Blockchain    | Solana (SPL), EVM (Base, Avalanche)   |
| Smart Contracts | Solidity, Anchor                    |
| Analytics     | Custom RPC queries / Subgraphs        |
| Distribution  | Twitter API (OAuth, RT verification)  |
| Bridges       | Axelar / LayerZero (future ready)     |

---

## 📦 Install & Run (Development)

```bash
git clone https://github.com/AMBNNJ/Forge.git 
cd Forge 

# Install dependencies
npm install

# Run development server
npm run dev
```
