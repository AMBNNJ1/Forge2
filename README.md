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
- **Presale Escrow**
  Investor funds are held in smart-contract escrow until the presale is finalized.
- **Audit Status Badges**
  Tokens display on-chain audit results so everyone knows the security status.

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
| Bridges       | Axelar / LayerZero                    |

---

## 🔄 Bridging Tokens

`lib/bridge.ts` includes helpers to transfer tokens between chains.

```ts
import { bridgeViaAxelar, bridgeViaLayerZero } from "./lib/bridge";

await bridgeViaAxelar({
  rpcUrl: "https://rpc.source",
  privateKey: "0x...",
  fromChain: "Ethereum",
  toChain: "Avalanche",
  tokenAddress: "0xToken",
  amount: 1000000000000000000n,
  destinationAddress: "0xRecipient"
});

await bridgeViaLayerZero({
  rpcUrl: "https://rpc.source",
  privateKey: "0x...",
  oftAddress: "0xOFT",
  dstChainId: 43114,
  amount: 1000000000000000000n,
  destinationAddress: "0xRecipient"
});
```

---

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
