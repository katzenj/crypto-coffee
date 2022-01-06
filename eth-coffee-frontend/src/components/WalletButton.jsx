import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useWeb3Modal from "../utils/useWeb3Modal";

const WaveButton = styled.button`
  cursor: pointer;
  margin-top: 16px;
  margin: 16px 4px 0px 4px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  background-color: whitesmoke;
  font-weight: 500;
  width: 100%;

  &:hover {
    background-color: darkblue;
  }
`;

const WalletButton = ({
  account,
  setAccount,
  provider,
  loadWeb3Modal,
  setName,
}) => {
  let isMounted = false;
  const [rendered, setRendered] = useState("");

  const fetchAccount = async () => {
    try {
      if (!provider || !isMounted) {
        return;
      }

      // Load the user's accounts.
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);

      // Resolve the ENS name for the first account.
      const name = await provider.lookupAddress(accounts[0]);

      // Render either the ENS name or the shortened account address.
      if (name) {
        setName(name);
      }
    } catch (err) {
      setAccount("");
      setRendered("");
      console.error(err);
    }
  };

  useEffect(() => {
    isMounted = true;
    if (isMounted) {
      fetchAccount();
    }
    return () => {
      isMounted = false;
    };
  }, [account, provider, setAccount, setRendered]);

  return (
    <WaveButton
      onClick={() => {
        loadWeb3Modal();
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </WaveButton>
  );
};

export default WalletButton;
