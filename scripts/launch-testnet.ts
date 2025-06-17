import { deployEvmToken } from '../lib/evm';
import { deploySolanaToken } from '../lib/solana';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Ensure contract artifacts exist for EVM deployments
const artifact = path.join(
  __dirname,
  '..',
  'artifacts',
  'contracts',
  'Token.sol',
  'Token.json'
);
if (!fs.existsSync(artifact)) {
  console.log('Compiling contracts...');
  execSync('pnpm hardhat compile', { stdio: 'inherit' });
}

async function main() {
  const chain = process.argv[2];
  if (!chain) {
    console.error('Usage: ts-node scripts/launch-testnet.ts <chain>');
    process.exit(1);
  }

  if (chain === 'solana') {
    const path = process.env.SOLANA_KEYPAIR ?? '';
    const secret = JSON.parse(fs.readFileSync(path, 'utf8')) as number[];
    const payer = Keypair.fromSecretKey(new Uint8Array(secret));
    const rpc = process.env.RPC_URL_SOLANA ?? '';
    const address = await deploySolanaToken(rpc, payer);
    console.log('Solana token deployed to', address);
    return;
  }

  const rpcMap: Record<string, string | undefined> = {
    base: process.env.RPC_URL_BASE,
    avalanche: process.env.RPC_URL_AVALANCHE,
  };
  const rpc = rpcMap[chain];
  if (!rpc) throw new Error('Unknown chain or RPC not set');
  const pk = process.env.EVM_PRIVATE_KEY ?? '';
  const address = await deployEvmToken(
    rpc,
    pk,
    'TestToken',
    'TT',
    18,
    1000000n,
  );
  console.log(`${chain} token deployed to`, address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
