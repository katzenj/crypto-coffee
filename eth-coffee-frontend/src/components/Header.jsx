import React from "react";

import AccountData from "./AccountData";
import Button from "./Button";

import { getTrimmedAddress } from "../utils/address";

import "./Header.css";

export default Header = ({ accountData, disconnect }) => {
  const addr = accountData?.address;
  const ens = accountData?.ens;

  const renderAccountData = () => {
    if (!addr) {
      return null;
    }
    return (
      <div className="user-address-container">
        {ens?.name ? ens?.name : getTrimmedAddress(addr)}
      </div>
    );
  };
  return (
    <header className="header-container">
      <h1 className="header-title">☕️ Matic Coffee</h1>
      <div className="header-right">
        {renderAccountData()}
        {accountData && <Button onClick={disconnect}>Disconnect</Button>}
      </div>
    </header>
  );
};
