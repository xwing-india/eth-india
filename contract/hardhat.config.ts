import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/ddac2247725f422196229bfba8ac3877",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.ETH_SCAN,
  },
};

export default config;
