import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/ddac2247725f422196229bfba8ac3877",
      accounts: [
        "3ddacb501d8b6167b17cbf5a079b076178e7bfd658b5e18270269a2f0d862f0f",
      ],
    },
  },
};

export default config;
