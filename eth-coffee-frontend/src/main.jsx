import React from "react";
import ReactDOM from "react-dom";
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
} from "wagmi";
import { providers } from "ethers";

import "./index.css";
import App from "./App";

import { INFURA_ID, NETWORK, NETWORK_ID } from "./utils/constants";

const infuraId = INFURA_ID;
// Chains for connectors to support
const chains = defaultChains.filter((c) => c.name == "Rinkeby");

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.rinkeby.rpcUrls[0]; // for devnet testing.

  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "Send a Coffee",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

const provider = ({ chainId }) => new providers.InfuraProvider(4, INFURA_ID);

ReactDOM.render(
  <React.StrictMode>
    <Provider autoConnect connectors={connectors} provider={provider}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
