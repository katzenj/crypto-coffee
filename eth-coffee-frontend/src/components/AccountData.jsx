import React from "react";

import { getTrimmedAddress } from "../utils/address";

import "./AccountData.css";

const AccountData = ({ ens, address, className }) => {
  return (
    <div className="account-container">
      {address ? (
        <>
          {ens?.avatar ? <img src={data.ens?.avatar} alt="ENS Avatar" /> : null}
          <div className="address-container">
            {ens?.name ? ens?.name : getTrimmedAddress(address)}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AccountData;
