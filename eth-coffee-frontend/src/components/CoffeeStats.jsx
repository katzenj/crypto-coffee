import React, { useEffect, useState } from "react";
import { useContract } from "wagmi";

import { CONTRACT_ADDRESS } from "../utils/constants";
import abi from "../utils/EthCoffee.json";

const ABI = abi.abi;

const CoffeeStats = ({ provider }) => {
  const [coffeesSent, setCoffeesSent] = useState(0);
  const [messages, setMessages] = useState([]);

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: provider,
  });

  const getTotalCoffeesSent = async () => {
    try {
      if (!provider) {
        return;
      }
      const txn = await contract.getTotalCoffeesSent();
      setCoffeesSent(txn.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      if (!provider) {
        return;
      }
      let txn = await contract.getMessagesSent(
        "0xf10f32ac5f3BE335337D4008a5bfdd353Fcc39A3"
      );
      console.log(messages);

      txn = await contract.getMessagesSent(
        "0xff48d93ee8790b3906c4fecb26a08846ab0e1109"
      );
      console.log(messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalCoffeesSent();
    getMessages();
  }, [provider]);

  return <div>{coffeesSent}</div>;
};

export default CoffeeStats;
