import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useContract, useProvider } from "wagmi";
import { ethers, providers } from "ethers";

import AccountData from "./components/AccountData";
import CoffeeStats from "./components/CoffeeStats";
import MessageInput from "./components/MessageInput";
import SendCoffee from "./components/SendCoffee";
import WalletConnect from "./components/WalletConnect";

import {
  CONTRACT_ADDRESS,
  INFURA_ID,
  NETWORK,
  NETWORK_ID,
} from "./utils/constants";

import "./App.css";
import abi from "./utils/EthCoffee.json";

const App = () => {
  const ABI = abi.abi;
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const provider = useProvider();

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     getMyWaves();
  //   }

  //   let etcContract;

  //   const onNewWave = (from, timestamp, message) => {
  //     setAllWaves((prevState) => [
  //       ...prevState,
  //       {
  //         address: from,
  //         timestamp: new Date(timestamp * 1000),
  //         message: message,
  //       },
  //     ]);
  //   };

  //   if (prv) {
  //     prv.pollingInterval = 600000; // 6 minutes
  //     etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, prv);
  //     etcContract.on("NewWave", onNewWave);
  //   }

  //   return () => {
  //     if (etcContract) {
  //       etcContract.off("NewWave", onNewWave);
  //     }
  //     isMounted = false;
  //   };
  // }, [currentAccount]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there</div>
        <AccountData data={accountData} disconnect={disconnect} />
        <CoffeeStats provider={provider} />
        <WalletConnect
          accountData={accountData}
          connectData={connectData}
          connectError={connectError}
          connect={connect}
        />
        <SendCoffee accountData={accountData} connectData={connectData} />
      </div>
    </div>
  );
};

export default App;
