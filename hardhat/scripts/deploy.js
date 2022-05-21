const { ethers } = require('hardhat');

async function main() {
  /**
   * whitelistContract is a factory for instances of the whitelist contract
   */
  const whitelistContract = await ethers.getContractFactory('Whitelist');

  // contract deployment
  const deployedWhitelistContract = await whitelistContract.deploy(10);
  await deployedWhitelistContract.deployed();
  console.log('Whitelist Contract Address:', deployedWhitelistContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
