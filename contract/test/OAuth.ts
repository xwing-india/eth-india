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

    await paymaster.addStake(10, { value: ethers.utils.parseEther("10") });
    await paymaster.deposit({ value: ethers.utils.parseEther("10") });

    const Counter = await ethers.getContractFactory("TestCounter");
    const counter = await Counter.deploy();
    await counter.deployed();

    await owner.sendTransaction({
      to: oauthAccount.address,
      value: ethers.utils.parseEther("1"),
    });

    await oauthAccount
      .connect(addr1)
      .createPersona(
        p1.address,
        [counter.address],
        [target.address],
        ethers.utils.parseEther("1.2")
      );
    //   console.log(await oauthAccount.getPersona(p1.address));
    const addr1Api = new SimpleAccountAPI({
      provider: ethers.provider,
      entryPointAddress: entryPoint.address,
      accountAddress: oauthAccount.address,

      paymasterAPI: { getPaymasterAndData: async () => paymaster.address },
      owner: p1,
    });
    const op = await addr1Api.createSignedUserOp({
      target: counter.address,
      data: counter.interface.encodeFunctionData("justemit"),
    });

    console.log(await ethers.provider.getBalance(owner.address));

    const tx = await entryPoint.handleOps([op], owner.address);
    // console.log(JSON.stringify(await tx.wait()));
    console.log(await ethers.provider.getBalance(owner.address));
  });
});
