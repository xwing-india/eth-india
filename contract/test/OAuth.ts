import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("OAuth", () => {
  it("simple test", async () => {
    const [owner, addr1, p1, p2, target] = await ethers.getSigners();
    const EntryPoint = await ethers.getContractFactory("EntryPoint");
    const entryPoint = await EntryPoint.deploy();
    await entryPoint.deployed();

    const OAuthDeployer = await ethers.getContractFactory(
      "OAuthAccountDeployer"
    );
    const oauthDeployer = await OAuthDeployer.deploy();
    await oauthDeployer.deployed();

    const Paymaster = await ethers.getContractFactory("DemoPaymaster");
    const paymaster = await Paymaster.deploy(entryPoint.address);
    await paymaster.deployed();

    const OAuthAccount = await ethers.getContractFactory("OAuthAccount");
    const oauthAccount = await OAuthAccount.deploy(
      entryPoint.address,
      addr1.address
    );
    await oauthAccount.deployed();

    await owner.sendTransaction({
      to: oauthAccount.address,
      value: ethers.utils.parseEther("1"),
    });

    await oauthAccount
      .connect(addr1)
      .createPersona(
        p1.address,
        [target.address],
        [],
        ethers.utils.parseEther("1.2")
      );
    await oauthAccount.connect(addr1).approve(owner.address);
    await oauthAccount.createSharingPersona(p2.address, [target.address], [], {
      value: ethers.utils.parseEther("1"),
    });

    console.log(
      ethers.utils.formatEther(
        await ethers.provider.getBalance(oauthAccount.address)
      )
    );
  });
});
