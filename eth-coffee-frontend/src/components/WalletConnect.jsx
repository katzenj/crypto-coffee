import React from "react";

import "./WalletConnect.css";

const WalletConnect = ({ accountData, connectData, connectError, connect }) => {
  return (
    <div className="connect-wallet-container">
      {!accountData &&
        connectData.connectors.map((connector) => (
          <button
            className="connect-wallet-button"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            {connector.name}
            {!connector.ready && " (unsupported)"}
          </button>
        ))}
      {connectError && console.error(connectError?.message)}
    </div>
  );
};

export default WalletConnect;
