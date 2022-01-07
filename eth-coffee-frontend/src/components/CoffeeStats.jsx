import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContract, useEnsLookup } from "wagmi";

import Button from "./Button";
import MessagesContainer from "./MessagesContainer";

import { CONTRACT_ADDRESS } from "../utils/constants";
import { getTrimmedAddress } from "../utils/address";

import abi from "../utils/EthCoffee.json";

import "./CoffeeStats.css";

const ABI = abi.abi;

const CoffeeStats = ({ ens, address, provider, resetReceiver }) => {
  const [coffeesSent, setCoffeesSent] = useState(0);
  const [messages, setMessages] = useState([]);

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: ABI,
    signerOrProvider: provider,
  });

  const getMessages = async () => {
    try {
      if (!provider) {
        return;
      }
      const newMessages = await contract.getMessagesSent(
        ethers.utils.getAddress(address)
      );
      const messagesMapped = newMessages.map((msg) => ({
        from: msg.from,
        timestamp: msg.timestamp,
        date: new Date(msg.timestamp * 1000),
        message: msg.message,
      }));

      if (messages.length !== messagesMapped.length) {
        setCoffeesSent(messagesMapped.length);
        setMessages(messagesMapped);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="coffee-stats-container">
      <div className="receiver-account-container">
        {address ? (
          <>
            {ens?.avatar ? (
              <img src={data.ens?.avatar} alt="ENS Avatar" />
            ) : null}
            <div className="receiver-address-container">
              <b>Receiver: </b>
              {ens?.name ? ens?.name : getTrimmedAddress(address)}
              <button className="cancel-button" onClick={resetReceiver}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
          </>
        ) : null}
      </div>
      <p>
        <b>Coffees sent to this address: </b>
        {coffeesSent}
      </p>
      <MessagesContainer messages={messages} />
    </div>
  );
};

export default CoffeeStats;
