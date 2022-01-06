// New main deploy for funding contract.
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Deployer balance: ', accountBalance.toString());

  const etcContractFactory = await hre.ethers.getContractFactory('EthCoffee');
  const etcContract = await etcContractFactory.deploy();
  await etcContract.deployed();

  console.log('etc coffee address: ', etcContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();