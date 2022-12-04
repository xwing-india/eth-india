import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/ddac2247725f422196229bfba8ac3877",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    cronos:{
      url: "https://evm-t3.cronos.org/",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    chiado:{
      url:"https://rpc.eu-central-2.gateway.fm/v3/gnosis/archival/chiado",
      accounts: [process.env.PRIVATE_KEY || ""],
    }
  },
  etherscan: {
    apiKey: process.env.ETH_SCAN,
  },
};

export default config;
