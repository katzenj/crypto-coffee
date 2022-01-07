import React from "react";
import Button from "./Button";

import "./WalletConnect.css";

const WalletConnect = ({ accountData, connectData, connectError, connect }) => {
  return (
    <div className="connect-wallet-container">
      {!accountData &&
        connectData.connectors.map((connector) => (
          <Button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
          </Button>
        ))}
      {connectError && console.error(connectError?.message)}
    </div>
  );
};

export default WalletConnect;
