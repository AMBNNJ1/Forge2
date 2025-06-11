import { ethers } from "ethers";
import PresaleArtifact from "../artifacts/contracts/PresaleEscrow.sol/PresaleEscrow.json";

export async function deployPresaleEscrow(
  rpcUrl: string,
  privateKey: string
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(
    PresaleArtifact.abi,
    PresaleArtifact.bytecode,
    wallet
  );
  const escrow = await factory.deploy();
  await escrow.waitForDeployment();
  return escrow.target as string;
}
