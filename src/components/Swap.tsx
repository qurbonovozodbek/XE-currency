import { FC } from "react";
import { IoMdSwap } from "react-icons/io";

interface SwapProps {
  change: () => void;
}

const Swap: FC <SwapProps> = (props) => {
  return (
    <div>
      <div onClick={props.change} className="change">
        <IoMdSwap className="swap-icon" />
      </div>
    </div>
  )
}

export default Swap