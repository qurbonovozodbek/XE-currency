import {  useState } from "react";
import Amount from "./Amount";
import { Select } from "./Select";
import Swap from "./Swap";
useState;

interface CountryType {
  code: string;
  label: string;
  symbol: string;
  flag?: string;
}

interface ResultType {
  amount: number;
  base: string;
  ms: number;
  result: {
    rate: number;
  };
}

function Currency() {
  function exchange(
    from: string = "USD",
    to: string = "EUR",
    amount: number | string = 100
  ) {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=f7f1b90157-66ec730a9f-sc4vkl`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e: React.MouseEvent) {
    e.preventDefault();
    exchange();
  }

  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<ResultType>();
  const [from, setFrom] = useState<CountryType>({
    code: "USD",
    label: "United States Dollar",
    symbol: "$",
  });
  const [to, setTo] = useState<CountryType>({
    code: "EUR",
    label: "Euro",
    symbol: "€",
  });

  function handleChangeAmount(value: string) {
    if (value) {
      setAmount(value);
      exchange(from.code, to.code, value);
    }
  }

  function handleSwap() {
    const fromCopied: CountryType = JSON.parse(JSON.stringify(from));
    const toCopied: CountryType = JSON.parse(JSON.stringify(to));
    setFrom(toCopied);
    setTo(fromCopied);
    exchange(from.code, to.code, amount);
  }

  return (
    <div>
      <div className="form">
        <div className="amount">
          <Amount symbol={from.symbol} value={amount} change={handleChangeAmount}></Amount>
        </div>
        <div className="select">
          <Select value={from} change={setFrom}></Select>
        </div>
        <div className="swap">
          <Swap change={handleSwap} ></Swap>
        </div>
        <div className="select">
          <Select value={to} change={setTo}></Select>
        </div>
      </div>
      <div className="result">
        {result?.amount && (
          <div className="info">
            <h3>
              {" "}
              {amount} {from.label} =
            </h3>
            <h1>
              {" "}
              {result?.amount * result.result.rate} {to.label}{" "}
            </h1>
            <h4>
              1 {from.code} = {result?.result.rate} {to.code}{" "}
            </h4>
            <h4>
              1 {to.code} = {result?.result.rate && 1 / result?.result.rate}{" "}
              {from.code}{" "}
            </h4>
          </div>
        )}
        <div className="button">
          <button onClick={handleChange}>Convert</button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
