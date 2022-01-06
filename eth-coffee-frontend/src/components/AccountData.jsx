import React from "react";

const AccountData = ({ data, disconnect }) => {
  return (
    <div>
      {data ? (
        <>
          <img src={data.ens?.avatar} alt="ENS Avatar" />
          <div>
            {data.ens?.name
              ? `${data.ens?.name} (${data.address})`
              : data.address}
          </div>
          <div>Connected to {data.connector.name}</div>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : null}
    </div>
  );
};

export default AccountData;
