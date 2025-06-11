import { ethers } from "ethers";
import { AxelarAssetTransfer, Environment } from "@axelar-network/axelarjs-sdk";
import oftArtifact from "@layerzerolabs/oft-evm/artifacts/contracts/oft/OFT.sol/OFT.json";

export interface AxelarBridgeOptions {
  rpcUrl: string;
  privateKey: string;
  fromChain: string;
  toChain: string;
  tokenAddress: string;
  amount: bigint;
  destinationAddress: string;
}

/**
 * Bridge ERC-20 tokens using Axelar's deposit address service.
 * Returns the deposit address that received the tokens.
 */
export async function bridgeViaAxelar({
  rpcUrl,
  privateKey,
  fromChain,
  toChain,
  tokenAddress,
  amount,
  destinationAddress,
}: AxelarBridgeOptions): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const assetTransfer = new AxelarAssetTransfer({ environment: Environment.MAINNET });

  const depositAddress = await assetTransfer.getDepositAddress({
    fromChain,
    toChain,
    destinationAddress,
    asset: tokenAddress,
  });

  const erc20 = new ethers.Contract(tokenAddress, ["function transfer(address,uint256) returns (bool)"] , wallet);
  const tx = await erc20.transfer(depositAddress, amount);
  await tx.wait();
  return depositAddress;
}

export interface LayerZeroBridgeOptions {
  rpcUrl: string;
  privateKey: string;
  oftAddress: string;
  dstChainId: number;
  amount: bigint;
  destinationAddress: string;
}

/**
 * Bridge tokens using LayerZero OFT contracts.
 * Returns the transaction hash once confirmed.
 */
export async function bridgeViaLayerZero({
  rpcUrl,
  privateKey,
  oftAddress,
  dstChainId,
  amount,
  destinationAddress,
}: LayerZeroBridgeOptions): Promise<string> {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const oft = new ethers.Contract(oftAddress, oftArtifact.abi, wallet);

  const tx = await oft.sendFrom(
    wallet.address,
    dstChainId,
    ethers.solidityPacked(["address"], [destinationAddress]),
    amount,
    wallet.address,
    ethers.ZeroAddress,
    "0x"
  );
  const receipt = await tx.wait();
  return receipt.hash;
}
