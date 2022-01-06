import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS } from "../utils/constants";
import abi from "../utils/EthCoffee.json";

import AmountInput from "./AmountInput";
import MessageInput from "./MessageInput";

import "./SendCoffee.css";

const ABI = abi.abi;

const SendCoffee = ({ accountData, connectData }) => {
  const [amount, setAmount] = useState(0.001);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!accountData) {
    return null;
  }

  const sendCoffee = async () => {
    try {
      setLoading(true);
      const signer = await connectData.connector.getSigner();
      const etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const txn = await etcContract.sendCoffee(
        "0xf10f32ac5f3BE335337D4008a5bfdd353Fcc39A3",
        message,
        { gasLimit: 300000, value: ethers.utils.parseEther(amount) }
      );
      console.log("mining", txn);
      await txn.wait();
      console.log("mined", txn);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <AmountInput amount={amount} setAmount={setAmount} />
      <MessageInput
        labelText="Add a message (optional)"
        value={message}
        setValue={setMessage}
      />
      <button className="send-coffee-button" onClick={() => sendCoffee()}>
        {loading ? <div className="loading"></div> : "Send Coffee"}
      </button>
    </div>
  );
};

export default SendCoffee;
