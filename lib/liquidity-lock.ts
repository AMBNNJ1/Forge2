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
