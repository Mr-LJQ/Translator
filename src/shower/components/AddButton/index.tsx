import React, { ReactNode } from "react";
import classnames from "classnames";

interface Props {
  status: number;
  loadingIcon?: ReactNode;
  statusText?: string;
  statusIcons?: ReactNode[];
  onClick: (...args: any[]) => void;
}

const defaultIcons = ["➕", "✔", "✖","✄", "↻", ]

function AddButton(props: Props) {
  const {
    status,
    statusText = "添加到Anki",
    statusIcons = defaultIcons,
    loadingIcon = "...",
    onClick,
  } = props;
  return (
    <span
      title={statusText}
      className={classnames("hover:bg-green-700 hover:text-gray-100 bg-green-600 cursor-pointer float-right rounded-full select-none text-base text-center text-white w-9", {
        add_note_success: status === 1 || status === -1,
        add_note_error: status === 2 || status === 3,
        add_note_relearn: status === 4,
      })}
      onClick={onClick}
    >
      {status === -1 ? loadingIcon : statusIcons[status]}
    </span>
  );
}

export default AddButton;
