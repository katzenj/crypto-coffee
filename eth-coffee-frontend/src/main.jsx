import React from "react";
import ReactDOM from "react-dom";
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  WalletLinkConnector,
  chain,
  defaultChains,
  defaultL2Chains,
} from "wagmi";
import { providers } from "ethers";

import "./index.css";
import App from "./App";

import { INFURA_ID, NETWORK, CHAIN_ID, ALCHEMY_KEY } from "./utils/constants";

// Chains for connectors to support
// TODO: change when ready.
// const chains = defaultChains.filter((c) => c.name == "Rinkeby");
const chains = defaultL2Chains.filter((c) => c.id === CHAIN_ID);

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.polygonTestnetMumbai.rpcUrls[0]; // for devnet testing.
  // chain.rinkeby.rpcUrls[0]; // for devnet testing.

  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      options: {
        // infuraId: INFURA_ID,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "Send a Coffee",
        jsonRpcUrl: `${rpcUrl}/${ALCHEMY_KEY}`,
      },
    }),
  ];
};

// TODO: change to mainnet when ready.
const provider = ({ chainId }) =>
  new providers.AlchemyProvider(CHAIN_ID, ALCHEMY_KEY);
// new providers.InfuraProvider(CHAIN_ID, INFURA_ID);

ReactDOM.render(
  <React.StrictMode>
    <Provider autoConnect connectors={connectors} provider={provider}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
