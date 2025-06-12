import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
// Anchor is optional and only used for the advanced deployer
// eslint-disable-next-line @typescript-eslint/no-var-requires
const anchor = require("@coral-xyz/anchor");

export async function deploySolanaToken(
  rpcUrl: string,
  payer: Keypair,
  decimals = 9
): Promise<string> {
  const connection = new Connection(rpcUrl, "confirmed");
  const mint = await createMint(connection, payer, payer.publicKey, null, decimals);
  return mint.toBase58();
}

/**
 * Anchor-based token deployer. This is a placeholder implementation that
 * expects an Anchor program capable of initializing a new mint. The program
 * should expose an `initialize_mint` instruction taking the desired decimals.
 */
export async function deploySolanaTokenAnchor(
  rpcUrl: string,
  payer: Keypair,
  programId: PublicKey,
  decimals = 9
): Promise<string> {
  const connection = new Connection(rpcUrl, "confirmed");
  const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(payer), {});
  const idl = await anchor.Program.fetchIdl(programId, provider);
  if (!idl) throw new Error("Anchor IDL not found for deployer program");
  const program = new anchor.Program(idl, programId, provider);
  const mint = Keypair.generate();
  await program.methods
    .initializeMint(new anchor.BN(decimals))
    .accounts({
      mint: mint.publicKey,
      payer: payer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([mint])
    .rpc();
  return mint.publicKey.toBase58();
}
