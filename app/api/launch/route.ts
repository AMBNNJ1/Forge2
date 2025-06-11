import { NextRequest, NextResponse } from 'next/server';
import { deploySolanaToken } from '@/lib/solana';
import { deployEvmToken } from '@/lib/evm';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const {
    chain,
    name,
    symbol,
    supply,
    rpcUrl,
    burnRate,
    transactionTax,
    presaleDuration,
  } = await req.json();
  if (!chain || !name || !symbol || !supply) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    let address: string | undefined;
    if (chain === 'solana') {
      const path = process.env.SOLANA_KEYPAIR ?? '';
      const secret = JSON.parse(fs.readFileSync(path, 'utf8')) as number[];
      const keypair = Keypair.fromSecretKey(new Uint8Array(secret));
      const rpc = rpcUrl || process.env.RPC_URL_SOLANA || '';
      address = await deploySolanaToken(rpc, keypair);
    } else if (chain === 'base') {
      const rpc = rpcUrl || process.env.RPC_URL_BASE || '';
      const pk = process.env.EVM_PRIVATE_KEY ?? '';
      address = await deployEvmToken(
        rpc,
        pk,
        name,
        symbol,
        BigInt(supply),
        BigInt(burnRate || 0),
        BigInt(transactionTax || 0),
        null,
        BigInt(presaleDuration || 0)
      );
    } else if (chain === 'avalanche') {
      const rpc = rpcUrl || process.env.RPC_URL_AVALANCHE || '';
      const pk = process.env.EVM_PRIVATE_KEY ?? '';
      address = await deployEvmToken(
        rpc,
        pk,
        name,
        symbol,
        BigInt(supply),
        BigInt(burnRate || 0),
        BigInt(transactionTax || 0),
        null,
        BigInt(presaleDuration || 0)
      );
    } else {
      return NextResponse.json({ error: 'Unsupported chain' }, { status: 400 });
    }

    return NextResponse.json({ address });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}
