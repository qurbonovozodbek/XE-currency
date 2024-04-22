import { FC } from "react";

interface AmountProps {
  value: string;
  change: (arg: string) => void,
  symbol: string
}

const Amount: FC<AmountProps> = (props) => {
  return (
    <div className="amount">
      <label htmlFor="amount-inp">Amount</label>
      <div className="input-amount">
        <span> {props.symbol} </span>
        <input
          type="text"
          id="amount-inp"
          value={props.value}
          onChange={(event) => {
            props.change(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Amount;
