import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useContract,
  useProvider,
  useEnsLookup,
} from "wagmi";
import { ethers, providers } from "ethers";

import AddressContainer from "./components/AddressContainer";
import CoffeeStats from "./components/CoffeeStats";
import Header from "./components/Header";
import SendCoffee from "./components/SendCoffee";
import WalletConnect from "./components/WalletConnect";

import { CONTRACT_ADDRESS, CHAIN_ID } from "./utils/constants";

import "./App.css";
import abi from "./utils/EthCoffee.json";

const App = () => {
  const ABI = abi.abi;
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const provider = useProvider();
  const [receiver, setReceiver] = useState();
  const [receiverInfo, setReceiverInfo] = useState({ name: "", address: "" });

  const resetReceiver = () => {
    setReceiverInfo({ name: "", address: "" });
  };

  return (
    <div>
      <Header accountData={accountData} disconnect={disconnect} />
      <div className="main-container">
        <div className="data-container">
          <div className="title">Send a coffee</div>
          <WalletConnect
            accountData={accountData}
            connectData={connectData}
            connectError={connectError}
            connect={connect}
          />
          {!receiverInfo.address && (
            <AddressContainer setAddressInfo={setReceiverInfo} />
          )}
          {receiverInfo.address && accountData ? (
            <>
              <CoffeeStats
                resetReceiver={resetReceiver}
                ens={receiverInfo.ens}
                address={receiverInfo.address}
                provider={provider}
              />
              <SendCoffee accountData={accountData} connectData={connectData} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
