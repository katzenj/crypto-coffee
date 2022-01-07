// Main function when we fund the contract.
const main = async () => {
  const [
    owner,
    randomPerson,
    randomPerson2,
    randomPerson3,
  ] = await hre.ethers.getSigners();

  const etcContractFactory = await hre.ethers.getContractFactory('EthCoffee');
  const etcContract = await etcContractFactory.deploy();
  await etcContract.deployed();
  console.log("Contract deployed to: %s", etcContract.address);

  getAndPrintBalance(randomPerson, 'Random Person 1');
  getAndPrintBalance(randomPerson2, 'Random Person 2');
  getAndPrintBalance(randomPerson3, 'Random Person 3');

  let coffeeTxn;
  let message = "woof";
  let amt = ethers.utils.parseEther('0.01');
  coffeeTxn = await etcContract.connect(randomPerson).sendCoffee(
    randomPerson2.address,
    message,
    { value: amt }
  );
  await coffeeTxn.wait();

  getAndPrintBalance(randomPerson, 'Random Person 1');
  getAndPrintBalance(randomPerson2, 'Random Person 2');
  getAndPrintBalance(randomPerson3, 'Random Person 3');

  coffeeTxn;
  message = "congrats beas";
  amt = ethers.utils.parseEther('0.13');
  coffeeTxn = await etcContract.connect(randomPerson3).sendCoffee(
    randomPerson2.address,
    message,
    { value: amt }
  );
  await coffeeTxn.wait();

  getAndPrintBalance(randomPerson, 'Random Person 1');
  getAndPrintBalance(randomPerson2, 'Random Person 2');
  getAndPrintBalance(randomPerson3, 'Random Person 3');

  let coffeeCount;
  coffeeCount = await etcContract.getTotalCoffeesSent();
  console.log('Coffees sent: ', coffeeCount.toNumber());

  let messagesToRand2 = await etcContract.getMessagesSent(randomPerson2.address);
  console.log(messagesToRand2)

  let messages = await etcContract.getAllMessages();
  console.log(messages);

  let amtBy = await etcContract.getAmountForAddress(randomPerson2.address);
  console.log(amtBy)

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const getAndPrintBalance = async (person, name) => {
  let balance = await person.getBalance();
  console.log(
    `${name} balance:`,
    hre.ethers.utils.formatEther(balance)
  );
}

runMain();