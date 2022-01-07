import React from "react";

const AccountData = ({ data }) => {
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
        </>
      ) : null}
    </div>
  );
};

export default AccountData;
