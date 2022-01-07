import React from "react";

import "./WalletConnect.css";

const WalletConnect = ({
  accountData,
  connectData,
  connectError,
  connect,
  disconnect,
}) => {
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
      <button className="connect-wallet-button" onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
};

export default WalletConnect;
