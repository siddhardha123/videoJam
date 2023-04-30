import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
  // Compile the contract
  const MyContract = await ethers.getContractFactory("gatedNFT");

  // Deploy the contract
  const myContract: Contract = await MyContract.deploy();

  // Wait for the contract to be mined and get its address
  await myContract.deployed();
  console.log("MyContract deployed to:", myContract.address);
}

// Run the deploy script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });