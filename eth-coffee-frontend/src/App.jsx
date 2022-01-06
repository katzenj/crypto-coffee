import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import MessageInput from "./components/MessageInput";
import WalletButton from "./components/WalletButton";
import useWeb3Modal from "./utils/useWeb3Modal";

import {
  CONTRACT_ADDRESS,
  INFURA_ID,
  NETWORK,
  NETWORK_ID,
} from "./utils/constants";

import "./App.css";
import abi from "./utils/WavePortal.json";

const App = () => {
  const ABI = abi.abi;

  const [currentAccount, setCurrentAccount] = useState(null);
  const [allWaves, setAllWaves] = useState([]);
  const [provider, loadWeb3Modal] = useWeb3Modal({
    network: NETWORK,
    infuraId: INFURA_ID,
  });
  const [name, setName] = useState("");

  const defaultProvider = new ethers.providers.InfuraProvider(
    NETWORK,
    INFURA_ID
  );
  const prv = provider || defaultProvider;
  const correctNetwork = window.ethereum.networkVersion === NETWORK_ID;

  const wave = async (message) => {
    try {
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );
      /*
       * Execute the actual wave from your smart contract
       */
      const waveTxn = await wavePortalContract.wave(message, {
        gasLimit: 300000,
      });
      await waveTxn.wait();

      getMyWaves();
    } catch (error) {
      console.error(error);
    }
  };

  const getMyWaves = async () => {
    try {
      if (!prv || !currentAccount || !correctNetwork) {
        return;
      }
      const wavePortalContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        prv
      );
      const waves = await wavePortalContract.getWaves(currentAccount);
      let wavesCleaned = waves.map((wave) => ({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      }));

      if (allWaves.length !== wavesCleaned.length) {
        setAllWaves(wavesCleaned);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getMyWaves();
    }

    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
      ]);
    };

    if (prv) {
      prv.pollingInterval = 600000; // 6 minutes
      wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, prv);
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
      isMounted = false;
    };
  }, [currentAccount]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          {"👋 Hey there" + `${name ? `, ${name}` : ""}!`}
        </div>

        <div className="bio">
          This was my first foray into smart contracts with solidity. Please
          validate me by clicking the wave button :).
        </div>

        {!currentAccount && (
          <WalletButton
            account={currentAccount}
            setAccount={setCurrentAccount}
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            setName={setName}
          />
        )}
        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="waveMessage">
              <div>
                <b>Address:</b> {wave.address}
              </div>
              <div>
                <b>Time:</b> {wave.timestamp.toString()}
              </div>
              <div>
                <b>Message:</b> {wave.message}
              </div>
            </div>
          );
        })}
        {currentAccount && !correctNetwork && (
          <div style={{ textAlign: "center" }}>
            <h2>switch network to rinkeby</h2>
          </div>
        )}
        {currentAccount && correctNetwork && (
          <MessageInput
            labelText="Message"
            submitText="Wave at me"
            sendMessage={wave}
          />
        )}
      </div>
    </div>
  );
};

export default App;
