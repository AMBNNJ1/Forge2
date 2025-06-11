import { ethers } from "ethers";
import TokenArtifact from "../artifacts/contracts/Token.sol/Token.json";

export async function deployEvmToken(
  rpcUrl: string,
  privateKey: string,
  name: string,
  symbol: string,
  supply: bigint,
  burnPercentage = 0n,
  taxPercentage = 0n,
  taxWallet: string | null = null
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(TokenArtifact.abi, TokenArtifact.bytecode, wallet);
  const token = await factory.deploy(
    name,
    symbol,
    supply,
    Number(burnPercentage),
    Number(taxPercentage),
    taxWallet ?? ethers.ZeroAddress
  );
  await token.waitForDeployment();
  return token.target as string;
}
