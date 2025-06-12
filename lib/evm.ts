import { ethers } from "ethers";
import TokenArtifact from "../artifacts/contracts/Token.sol/Token.json";

export async function deployEvmToken(
  rpcUrl: string,
  privateKey: string,
  name: string,
  symbol: string,
  decimals: number,
  supply: bigint,
  burnPercentage = 0n,
  taxPercentage = 0n,
  taxWallet: string | null = null,
  presaleDuration = 0n
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(TokenArtifact.abi, TokenArtifact.bytecode, wallet);
  const token = await factory.deploy(
    name,
    symbol,
    decimals,
    supply,
    Number(burnPercentage),
    Number(taxPercentage),
    taxWallet ?? ethers.ZeroAddress
  );
  await token.waitForDeployment();
  if (presaleDuration > 0n) {
    const tx = await token.startPresale(presaleDuration);
    await tx.wait();
  }
  return token.target as string;
}
