import React, { ReactNode } from "react";
import classnames from "classnames";
import { Status } from "../../../types/index";

interface Props {
  status: Status;
  statusText?: string;
  loadingIcon?: ReactNode;
  statusIcons?: ReactNode[];
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

const defaultIcons = ["➕", "√", "×", "✄", "↻"];
const { loading, success, error, disconnected, relearn } = Status;

function AddButton(props: Props) {
  const {
    status,
    loadingIcon = "...",
    statusText = "添加到Anki",
    statusIcons = defaultIcons,
    onClick,
  } = props;
  return (
    <span
      title={statusText}
      className={classnames(
        "hover:bg-green-700 hover:text-gray-100 indent-0 bg-green-600 cursor-pointer float-right rounded-full select-none text-base text-center text-white w-9",
        {
          "prior:cursor-auto": status === loading || status === success,
          "prior:bg-red-700": status === error || status === disconnected,
          "prior:bg-yellow-500": status === relearn,
        }
      )}
      onClick={onClick}
    >
      {status === loading ? loadingIcon : statusIcons[status]}
    </span>
  );
}

export default AddButton;
