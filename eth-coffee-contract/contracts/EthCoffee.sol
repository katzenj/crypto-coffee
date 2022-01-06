// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract EthCoffee is ReentrancyGuard {
  using Counters for Counters.Counter;

  Counters.Counter private totalCoffees;
  mapping(address => Message[]) private messageForAddress;
  mapping(address => uint256) private amountByAddress;
  mapping(address => uint256) public lastMessagedAt;

  event CoffeeSent(address indexed from, uint256 timestamp, string message);

  struct Message {
    address from;
    string message;
    uint256 timestamp;
  }

  // ============ ACCESS CONTROL/SANITY MODIFIERS ============

  constructor() payable {
  }

  modifier rateLimiter() {
    require(
        lastMessagedAt[msg.sender] + 30 seconds < block.timestamp,
        "Wait 30s"
    );
    _;
  }

  modifier messageSizeLimit(string memory _message) {
    require(
      bytes(_message).length < 140, // Arbitrary for now.
      "Message is too long"
    );
    _;
  }

  modifier validAmount() {
    require(
      msg.value > 0,
      "Amount must be more than 0"
    );
    _;
  }

  modifier validAddress(address _to) {
    require(
      _to != address(0),
      "Must be valid address"
    );
    _;
  }


  // ============ PUBLIC WRITE FUNCTIONS ============

  function sendCoffee(
    address payable _to,
    string memory _message
  )
    rateLimiter
    messageSizeLimit(_message)
    validAmount
    validAddress(_to)
    nonReentrant
    payable
    public
  {
    lastMessagedAt[msg.sender] = block.timestamp;

    totalCoffees.increment();
    Message memory curMessage = Message(_to, _message, block.timestamp);
    messageForAddress[_to].push(curMessage);

    (bool success, ) = _to.call{value: msg.value}("");
    require(success, "Failed to transfer Ether");

    emit CoffeeSent(_to, block.timestamp, _message);
  }

  // ============ PUBLIC READ FUNCTIONS ============

  function getTotalCoffeesSent() public view returns (uint256) {
    return totalCoffees.current();
  }

  function getMessagesSent(address addr) public view returns (Message[] memory) {
    return messageForAddress[addr];
  }
}
