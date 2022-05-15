import React from "react";
import classnames from "classnames";

import {CardState} from "../View"

interface Props {
  state: CardState;
  explanation: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export function CardStateButton(props: Props) {
  const {
    state,
    explanation,
    onClick,
  } = props;
  return (
    <span
      title={explanation}
      className={classnames(
        "hover:bg-green-700 hover:text-gray-100 indent-0 bg-green-600 cursor-pointer float-right rounded-full select-none text-base text-center text-white w-9",
        {
          "prior:cursor-auto": state === CardState.Loading || state ===  CardState.Success,
          "prior:bg-red-700": state === CardState.Error || state === CardState.Disconnect,
          "prior:bg-yellow-500": state === CardState.Relearn,
        }
      )}
      onClick={onClick}
    >
      {state}
    </span>
  );
}

