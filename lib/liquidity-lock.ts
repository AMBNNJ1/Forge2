import { ethers } from "ethers";
import LiquidityLockArtifact from "../artifacts/contracts/LiquidityLock.sol/LiquidityLock.json";

export async function deployLiquidityLock(
  rpcUrl: string,
  privateKey: string,
  tokenAddress: string,
  duration: bigint
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(
    LiquidityLockArtifact.abi,
    LiquidityLockArtifact.bytecode,
    wallet
  );
  const lock = await factory.deploy(tokenAddress, Number(duration));
  await lock.waitForDeployment();
  return lock.target as string;
}

/**
 * Placeholder for deploying a Solana liquidity locking program using Anchor.
 * The underlying program should accept a token mint and lock duration.
 */
export async function deploySolanaLiquidityLock(
  rpcUrl: string,
  payer: import("@solana/web3.js").Keypair,
  programId: import("@solana/web3.js").PublicKey,
  mint: import("@solana/web3.js").PublicKey,
  duration: number
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const anchor = require("@coral-xyz/anchor");
  const connection = new (require("@solana/web3.js").Connection)(rpcUrl, "confirmed");
  const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(payer), {});
  const idl = await anchor.Program.fetchIdl(programId, provider);
  if (!idl) throw new Error("Anchor IDL not found for liquidity lock");
  const program = new anchor.Program(idl, programId, provider);
  const lockAccount = anchor.web3.Keypair.generate();
  await program.methods
    .initialize(new anchor.BN(duration))
    .accounts({
      lock: lockAccount.publicKey,
      mint,
      payer: payer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([lockAccount])
    .rpc();
  return lockAccount.publicKey.toBase58();
}
