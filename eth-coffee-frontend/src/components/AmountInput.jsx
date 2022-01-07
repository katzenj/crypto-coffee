import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";

import "./AmountInput.css";

const AmountInput = ({ amount, setAmount }) => {
  const [price, setPrice] = useState(null);

  const COFFEE_PRICE = 4.0;
  const LIMIT = 1;
  // const BINANCE_API_URL =
  //   "https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT";
  const BINANCE_API_URL =
    "https://api.binance.com/api/v1/ticker/price?symbol=MATICUSDT";

  const getEthUsdPrice = async () => {
    const res = await fetch(BINANCE_API_URL);
    const json = await res.json();
    const price = parseFloat(json["price"]);
    setPrice(price);

    const amount = parseFloat(COFFEE_PRICE / price).toFixed(4);
    setAmount(amount);
  };

  const getEthToUsdConversion = () => {
    if (price && amount) {
      const converted = (amount * price).toFixed(2);
      return (
        <p>
          {amount} MATIC : ${converted}
        </p>
      );
    }
    return null;
  };

  const onAmountChange = (value) => {
    if (Number(value) > LIMIT) {
      return;
    }
    setAmount(value);
  };

  useEffect(() => {
    getEthUsdPrice();
  }, []);

  return (
    <div className="amount-container">
      <p className="amount-label">Amount</p>
      <CurrencyInput
        id="amount"
        name="input"
        placeholder="Please enter an amount"
        value={amount}
        defaultValue={null}
        decimalsLimit={4}
        onValueChange={(value, _) => onAmountChange(value)}
      />
      {getEthToUsdConversion()}
    </div>
  );
};

export default AmountInput;
