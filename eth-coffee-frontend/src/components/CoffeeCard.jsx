import React from "react";
import { useEnsLookup } from "wagmi";

import "./CoffeeCard.css";

const CoffeeCard = ({ data }) => {
  const [{ data: ens, error: ensError, loading: ensLoading }] = useEnsLookup({
    address: data.from,
  });

  const getTrimmedAddress = (addr) => {
    const firstSix = addr.slice(0, 6);
    const lastThree = addr.slice(addr.length - 3);
    return `${firstSix}...${lastThree}`;
  };

  const from = ens ? ens.name : getTrimmedAddress(data.from);

  return (
    <div key={data.timestamp} className="message-card">
      <p className="message-text">
        <b>Date: </b>
        {data.date.toString()}
      </p>
      <p className="message-text">
        <b>Message: </b>
        {data.message}
      </p>
    </div>
  );
};

export default CoffeeCard;
