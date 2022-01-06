import React from "react";

const AccountData = ({ data, disconnect }) => {
  return (
    <div>
      {data ? (
        <>
          {data.ens?.avatar ? (
            <img src={data.ens?.avatar} alt="ENS Avatar" />
          ) : null}
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
