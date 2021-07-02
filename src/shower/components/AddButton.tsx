import React, { ReactNode } from "react";
import classnames from "classnames";
import { Status } from "../../../types/index";

interface Props {
  status: Status;
  loadingIcon?: ReactNode;
  statusText?: string;
  statusIcons?: ReactNode[];
  onClick: (...args: any[]) => void;
}

const defaultIcons = ["➕", "✔", "×", "✄", "↻"];

function AddButton(props: Props) {
  const {
    status,
    statusText = "添加到Anki",
    statusIcons = defaultIcons,
    loadingIcon = "...",
    onClick,
  } = props;
  const { loading, success, error, disconnected, relearn } = Status;
  return (
    <span
      title={statusText}
      className={classnames(
        "hover:bg-green-700 hover:text-gray-100 indent-0 bg-green-600 cursor-pointer float-right rounded-full select-none text-base text-center text-white w-9",
        {
          "cursor-auto": status === loading || status === success,
          "bg-red-600": status === error || status === disconnected,
          "bg-yellow-400": status === relearn,
        }
      )}
      onClick={onClick}
    >
      {status === loading ? loadingIcon : statusIcons[status]}
    </span>
  );
}

export default AddButton;
