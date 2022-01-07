import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContract } from "wagmi";

import "./CoffeeStats.css";

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
      const newMessages = await contract.getMessagesSent(
        ethers.utils.getAddress("0xf10f32ac5f3BE335337D4008a5bfdd353Fcc39A3")
      );
      const messagesMapped = newMessages.map((msg) => ({
        from: msg.from,
        timestamp: msg.timestamp,
        date: new Date(msg.timestamp * 1000),
        message: msg.message,
      }));

      if (messages.length !== messagesMapped.length) {
        setMessages(messagesMapped);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalCoffeesSent();
    getMessages();
  }, []);

  return (
    <div>
      <p>{coffeesSent}</p>
      {messages.map((m) => {
        return (
          <div key={m.timestamp} className="message-card">
            <p className="message-text">
              <b>From:</b> {m.from}
            </p>
            <p className="message-text">
              <b>Message:</b> {m.message}
            </p>
            <p className="message-text">
              <b>Date:</b> {m.date.toString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CoffeeStats;
