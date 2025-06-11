import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    "MyToken",
    "MTK",
    ethers.parseUnits("1000000", 18),
    0,
    0,
    ethers.ZeroAddress
  );
  await token.waitForDeployment();

  console.log("Token deployed to", token.target);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
