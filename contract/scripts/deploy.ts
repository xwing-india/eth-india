import { ethers } from "hardhat";

async function main() {
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.deployed();

  const OAuthDeployer = await ethers.getContractFactory("OAuthAccountDeployer");
  const oauthDeployer = await OAuthDeployer.deploy();
  await oauthDeployer.deployed();

  const Paymaster = await ethers.getContractFactory("DemoPaymaster");
  const paymaster = await Paymaster.deploy(entryPoint.address);
  await paymaster.deployed();

  console.log("EntryPoint deployed to:", entryPoint.address);
  console.log("OAuthDeployer deployed to:", oauthDeployer.address);
  console.log("Paymaster deployed to:", paymaster.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
