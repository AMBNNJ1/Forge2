export interface TokenMetrics {
  address: string;
  chain: string;
  supply: string;
  decimals?: number;
  marketCap?: number | null;
  price?: number | null;
  holders: number;
  totalBurned: string;
}

import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const ERC20_ABI = [
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
];

async function getTokenPrice(chain: string, address: string) {
  const map: Record<string, string> = {
    ethereum: 'ethereum',
    avalanche: 'avalanche',
    base: 'base',
    solana: 'solana',
  };
  const id = map[chain.toLowerCase()] || 'ethereum';
  const url = `https://api.coingecko.com/api/v3/simple/token_price/${id}?contract_addresses=${address}&vs_currencies=usd&include_market_cap=true`;
  try {
    const res = await fetch(url);
    if (!res.ok) return { price: null, marketCap: null };
    const data = await res.json();
    const info = data[address.toLowerCase()];
    return {
      price: info?.usd ?? null,
      marketCap: info?.usd_market_cap ?? null,
    };
  } catch {
    return { price: null, marketCap: null };
  }
}

export async function getEvmTokenMetrics(rpcUrl: string, address: string, chain: string): Promise<TokenMetrics> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(address, ERC20_ABI, provider);
  const [totalSupply, decimals] = await Promise.all([
    contract.totalSupply(),
    contract.decimals(),
  ]);

  const transferTopic = ethers.id('Transfer(address,address,uint256)');
  const zeroTopic = ethers.zeroPadValue(ethers.ZeroAddress, 32);

  const burnLogs = await provider.getLogs({
    address,
    fromBlock: 0,
    toBlock: 'latest',
    topics: [transferTopic, null, zeroTopic],
  });
  const burned = burnLogs.reduce((acc, log) => acc + BigInt(log.data), 0n);

  const allLogs = await provider.getLogs({
    address,
    fromBlock: 0,
    toBlock: 'latest',
    topics: [transferTopic],
  });
  const holders = new Set<string>();
  for (const log of allLogs) {
    const from = '0x' + log.topics[1].slice(26);
    const to = '0x' + log.topics[2].slice(26);
    if (from !== ethers.ZeroAddress) holders.add(from.toLowerCase());
    if (to !== ethers.ZeroAddress) holders.add(to.toLowerCase());
  }

  const { price, marketCap } = await getTokenPrice(chain, address);

  return {
    address,
    chain,
    supply: totalSupply.toString(),
    decimals,
    marketCap,
    price,
    holders: holders.size,
    totalBurned: burned.toString(),
  };
}

export async function getSolanaTokenMetrics(rpcUrl: string, address: string): Promise<TokenMetrics> {
  const connection = new Connection(rpcUrl, 'confirmed');
  const mint = new PublicKey(address);
  const supplyInfo = await connection.getTokenSupply(mint);

  const accounts = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: [
      { memcmp: { offset: 0, bytes: address } },
      { dataSize: 165 },
    ],
  });

  return {
    address,
    chain: 'solana',
    supply: supplyInfo.value.amount,
    decimals: supplyInfo.value.decimals,
    marketCap: null,
    price: null,
    holders: accounts.length,
    totalBurned: '0',
  };
}

export async function getTokenMetrics(chain: string, address: string): Promise<TokenMetrics> {
  if (chain === 'solana') {
    const rpc = process.env.RPC_URL_SOLANA ?? '';
    return getSolanaTokenMetrics(rpc, address);
  }

  const rpcMap: Record<string, string | undefined> = {
    base: process.env.RPC_URL_BASE,
    avalanche: process.env.RPC_URL_AVALANCHE,
    ethereum: process.env.RPC_URL_ETHEREUM,
  };
  const rpcUrl = rpcMap[chain] ?? process.env.RPC_URL_BASE ?? '';
  return getEvmTokenMetrics(rpcUrl, address, chain);
}

