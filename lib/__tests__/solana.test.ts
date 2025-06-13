jest.mock('@coral-xyz/anchor', () => ({}), { virtual: true });
jest.mock('@solana/spl-token', () => ({ createMint: jest.fn() }), { virtual: true });
jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn(),
  Keypair: {},
  PublicKey: jest.fn(),
}), { virtual: true });

import { deploySolanaToken } from '../solana';
import { createMint } from '@solana/spl-token';
import type { Keypair } from '@solana/web3.js';

describe('deploySolanaToken', () => {
  it('creates a new mint and returns its address', async () => {
    (createMint as jest.Mock).mockResolvedValue({ toBase58: () => 'mint' });
    const payer = { publicKey: 'pub' } as unknown as Keypair;
    const address = await deploySolanaToken('url', payer, 8);
    expect(createMint).toHaveBeenCalledWith(expect.anything(), payer, payer.publicKey, null, 8);
    expect(address).toBe('mint');
  });
});
