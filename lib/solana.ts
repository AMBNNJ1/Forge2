import { Connection, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

export async function deploySolanaToken(rpcUrl: string, payer: Keypair): Promise<string> {
  const connection = new Connection(rpcUrl, "confirmed");
  const mint = await createMint(connection, payer, payer.publicKey, null, 9);
  return mint.toBase58();
}
