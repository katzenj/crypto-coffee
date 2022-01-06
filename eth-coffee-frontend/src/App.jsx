import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useContract, useProvider } from "wagmi";
import { ethers, providers } from "ethers";
import AccountData from "./components/AccountData";
import MessageInput from "./components/MessageInput";
import WalletButton from "./components/WalletButton";
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
  // const contract = useContract({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: abi.abi,
  //   signerOrProvider: provider,
  // });

  const sendCoffee = async (amount, message) => {
    try {
      if (!provider) {
        return;
      }
      const signer = await connectData.connector.getSigner();
      const etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const txn2 = await etcContract.sendCoffee(
        "0xFF48d93EE8790B3906C4FECb26A08846Ab0e1109",
        "my message",
        { gasLimit: 300000 }
      );
      console.log(txn2);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalCoffeesSent = async () => {
    try {
      if (!provider) {
        return;
      }
      const signer = await connectData.connector.getSigner();
      const etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const txn = await etcContract.getTotalCoffeesSent();
    } catch (error) {
      console.error(error);
    }
  };

  // const getMyWaves = async () => {
  //   try {
  //     if (!prv || !currentAccount || !correctNetwork) {
  //       return;
  //     }
  //     const etcContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, prv);
  //     const waves = await etcContract.getWaves(currentAccount);
  //     let wavesCleaned = waves.map((wave) => ({
  //       address: wave.waver,
  //       timestamp: new Date(wave.timestamp * 1000),
  //       message: wave.message,
  //     }));

  //     if (allWaves.length !== wavesCleaned.length) {
  //       setAllWaves(wavesCleaned);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        <WalletConnect
          accountData={accountData}
          connectData={connectData}
          connectError={connectError}
          connect={connect}
        />

        <button onClick={() => sendCoffee(0, "woof")}>Send Coffee</button>
      </div>
    </div>
  );
};

export default App;
