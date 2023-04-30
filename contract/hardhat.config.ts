import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv'
dotenv.config()
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
      polygon_mumbai: {
          url: "https://polygon-mumbai.g.alchemy.com/v2/s6Dbs5VQM5YfT02mh1emBMNqaGl0unZo",
          // url : "https://app.zeeve.io/shared-api/poly/83152b88999add148ac59b150c6682fb22e64fddc18c3b38/",
          accounts: [process.env.PRIVATE_KEY || "privatekey"]
      }
  }
};

export default config;