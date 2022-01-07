import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { CONTRACT_ADDRESS } from "../utils/constants";
import abi from "../utils/EthCoffee.json";

import AmountInput from "./AmountInput";
import Button from "./Button";
import TextInput from "./TextInput";

import "./SendCoffee.css";

const ABI = abi.abi;

const SendCoffee = ({ accountData, connectData }) => {
  const [amount, setAmount] = useState(0.001);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCoffee = async () => {
    try {
      setLoading(true);
      const signer = await connectData.connector.getSigner();
      const etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const txn = await etcContract.sendCoffee(
        "0xf10f32ac5f3BE335337D4008a5bfdd353Fcc39A3",
        message,
        { gasLimit: 900000, value: ethers.utils.parseEther(amount) }
      );
      await txn.wait();
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (!accountData) {
    return null;
  }

  return (
    <div>
      <AmountInput amount={amount} setAmount={setAmount} />
      <TextInput
        labelText="Add a message (optional)"
        value={message}
        setValue={setMessage}
      />
      <Button onClick={() => sendCoffee()}>
        {loading ? <div className="loading"></div> : "Send Coffee"}
      </Button>
    </div>
  );
};

export default SendCoffee;
