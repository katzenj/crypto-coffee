const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("EthCoffee", function () {
  let etc;

  beforeEach(async function() {
    const EthCoffee = await ethers.getContractFactory("EthCoffee");
    etc = await EthCoffee.deploy();
    await etc.deployed();
  });

  it("Should get messages", async function () {
    const [owner, _random] = await ethers.getSigners();
    const msg = "message";
    const amt = ethers.utils.parseEther('0.01');
    const amtEth = parseFloat(ethers.utils.formatEther(amt));
    const prevBalance = await _random.getBalance();
    const prevEth = parseFloat(ethers.utils.formatEther(prevBalance));

    const txn = await etc.sendCoffee(
      _random.address,
      msg,
      { value: amt },
    );
    const totalCoffees = await etc.getTotalCoffeesSent();
    expect(totalCoffees).to.equal(1);

    const messages = await etc.getMessagesSent(_random.address);
    expect(messages[0].message).to.equal(msg);

    const newBalance = await _random.getBalance();
    const newEther = parseFloat(ethers.utils.formatEther(newBalance));
    expect(prevEth + amtEth).to.equal(newEther);
  });

  it("Should rate limit sends", async function () {
    const [owner, _random] = await ethers.getSigners();
    const msg = "message";
    const amt = ethers.utils.parseEther('0.01');

    const txn = await etc.sendCoffee(
      _random.address,
      msg,
      { value: amt },
    );

    const sendCoffee = etc.sendCoffee(
      _random.address,
      msg,
      { value: amt },
    );
    await expect(sendCoffee).to.be.reverted;
  });
});
