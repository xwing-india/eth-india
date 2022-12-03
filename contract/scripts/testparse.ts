import { ethers } from "hardhat";

async function main() {
  const Test = await ethers.getContractFactory("TestParse");
  const test = await Test.deploy();
  await test.deployed();

  const OAuth = await ethers.getContractFactory("OAuthAccount");
  const oauth = await OAuth.deploy(test.address, test.address);
  await oauth.deployed();

  const result = await test.parse(
    oauth.interface.encodeFunctionData("execFromEntryPoint", [
      oauth.address,
      100,
      "0x00",
    ])
  );
  console.log(
    oauth.interface.encodeFunctionData("execFromEntryPoint", [
      oauth.address,
      100,
      "0x00",
    ])
  );
  console.log(oauth.address);
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
