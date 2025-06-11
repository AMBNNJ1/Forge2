import { ethers } from "ethers";

/**
 * Transfer tokens to a user after their tweet has been verified.
 *
 * The function expects the following environment variables to be set:
 * - `AIRDROP_RPC_URL`     RPC endpoint of the chain hosting the token
 * - `EVM_PRIVATE_KEY`     Private key of the wallet distributing tokens
 * - `AIRDROP_TOKEN_ADDRESS`  ERC-20 token contract address
 * - `AIRDROP_AMOUNT`      Amount of tokens to send (human readable)
 */
export async function distributeTokens(user: string): Promise<void> {
  const rpcUrl = process.env.AIRDROP_RPC_URL;
  const pk = process.env.EVM_PRIVATE_KEY;
  const tokenAddress = process.env.AIRDROP_TOKEN_ADDRESS;
  const amount = process.env.AIRDROP_AMOUNT || "0";

  if (!rpcUrl || !pk || !tokenAddress) {
    throw new Error("Token distribution environment not configured");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(pk, provider);
  const erc20 = new ethers.Contract(
    tokenAddress,
    [
      "function transfer(address,uint256) returns (bool)",
      "function decimals() view returns (uint8)",
    ],
    wallet
  );

  const decimals: number = await erc20.decimals().catch(() => 18);
  const value = ethers.parseUnits(amount, decimals);
  const tx = await erc20.transfer(user, value);
  await tx.wait();
}

